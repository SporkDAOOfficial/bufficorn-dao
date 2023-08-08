import { useEffect, useState } from 'react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';

import { LOCAL_ABI } from '@daohaus/abis';
import {
  ContractLego,
  formatValueTo,
  handleErrorMessage,
  isEthAddress,
  ReactSetter,
  toBaseUnits,
  toWholeUnits,
  TXLego,
  createViemClient,
  MaxUint256,
} from '@daohaus/utils';
import { CONTRACT_KEYCHAINS, isValidNetwork } from '@daohaus/keychain-utils';
import { useDHConnect } from '@daohaus/connect';
import { FieldSpacer } from '@daohaus/form-builder';
import { useTxBuilder } from '@daohaus/tx-builder';
import {
  Buildable,
  Button,
  ErrorMessage,
  FieldAlert,
  SuccessMessage,
  useToast,
  WrappedInput,
  WrappedSelect,
} from '@daohaus/ui';
import { TARGET_DAO } from '../../targetDao';
import { useCurrentDao } from '@daohaus/moloch-v3-hooks';

type TokenData = {
  allowance: string;
  balance: string;
  decimals: number;
  tokenName: string;
  tokenSymbol: string;
};

enum TokenFetchStates {
  Idle = '',
  Loading = 'Loading Token Data...',
  NotEthAddress = 'Not a valid Ethereum address',
  NotValidNetwork = 'Not a valid network',
  NotConnected = 'Connection Error',
  Error = 'Error fetching token data',
  Success = 'Success',
}

const tokenList = TARGET_DAO[import.meta.env.VITE_TARGET_KEY].TRIBUTE_TOKENS;

const ERC_20_CONTRCT: ContractLego = {
  type: 'static',
  contractName: 'ERC20',
  abi: LOCAL_ABI.ERC20,
  targetAddress: '.tokenAddress',
};

export const APPROVE_TX: TXLego = {
  id: 'APPROVE_TOKEN',
  contract: ERC_20_CONTRCT,
  method: 'approve',
  args: [
    { type: 'singleton', keychain: CONTRACT_KEYCHAINS.TRIBUTE_MINION },
    { type: 'static', value: MaxUint256 },
  ],
};

const fetchUserERC20 = async ({
  tokenAddress,
  chainId,
  userAddress,
  shouldUpdate,
  setFetchState,
  setTokenData,
  setNeedsApproval,
}: {
  tokenAddress: string;
  chainId: string | null | undefined;
  shouldUpdate: boolean;
  userAddress: string | undefined | null;
  setFetchState: ReactSetter<TokenFetchStates>;
  setNeedsApproval: ReactSetter<boolean>;
  setTokenData: ReactSetter<null | TokenData>;
}) => {
  setFetchState(TokenFetchStates.Loading);

  if (!tokenAddress) {
    return setFetchState(TokenFetchStates.Idle);
  }
  if (!isEthAddress(tokenAddress))
    return setFetchState(TokenFetchStates.NotEthAddress);
  if (
    !isValidNetwork(chainId) ||
    !userAddress ||
    !CONTRACT_KEYCHAINS.TRIBUTE_MINION[chainId]
  )
    return setFetchState(TokenFetchStates.NotValidNetwork);

  const spenderAddress = CONTRACT_KEYCHAINS.TRIBUTE_MINION[chainId];

  const client = createViemClient({
    chainId,
  });

  try {
    const balance = (await client.readContract({
      abi: LOCAL_ABI.ERC20,
      address: tokenAddress,
      functionName: 'balanceOf',
      args: [userAddress],
    })) as bigint;

    const decimals = await client.readContract({
      abi: LOCAL_ABI.ERC20,
      address: tokenAddress,
      functionName: 'decimals',
    });
    const tokenName = await client.readContract({
      abi: LOCAL_ABI.ERC20,
      address: tokenAddress,
      functionName: 'name',
    });
    const tokenSymbol = await client.readContract({
      abi: LOCAL_ABI.ERC20,
      address: tokenAddress,
      functionName: 'symbol',
    });
    const allowance = (await client.readContract({
      abi: LOCAL_ABI.ERC20,
      address: tokenAddress,
      functionName: 'allowance',
      args: [userAddress, spenderAddress],
    })) as bigint;
    const tokenData = {
      allowance: allowance.toString(),
      balance: balance.toString(),
      decimals,
      tokenName,
      tokenSymbol,
    } as TokenData;

    if (tokenData && shouldUpdate) {
      setTokenData(tokenData);
      setFetchState(TokenFetchStates.Success);

      allowance.toString() === '0'
        ? setNeedsApproval(true)
        : setNeedsApproval(false);
    }
  } catch (error) {
    console.error(error);
    setFetchState(TokenFetchStates.Error);
  }
};

export const BufficornTributeInput = (
  props: Buildable<{ addressId?: string; amtId?: string }>
) => {
  const { addressId = 'tokenAddress', amtId = 'tokenAmount', disabled } = props;

  const { control, setValue } = useFormContext();
  const { address } = useDHConnect();
  const { daoChain } = useCurrentDao();
  const tokenAddress = useWatch({
    name: addressId,
    control,
  });
  const [fetchState, setFetchState] = useState(TokenFetchStates.Idle);
  const [needsApproval, setNeedsApproval] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<null | TokenData>(null);

  useEffect(() => {
    let shouldUpdate = true;
    fetchUserERC20({
      tokenAddress,
      chainId: daoChain,
      userAddress: address,
      setFetchState,
      setTokenData,
      setNeedsApproval,
      shouldUpdate,
    });
    return () => {
      shouldUpdate = false;
    };
  }, [tokenAddress, address]);

  const tokenName =
    tokenData?.tokenName && fetchState === TokenFetchStates.Success
      ? ({
          type: 'success',
          message: `Token: ${tokenData.tokenName}`,
        } as SuccessMessage)
      : undefined;

  const tokenError =
    fetchState === TokenFetchStates.Error
      ? ({
          type: 'error',
          message: TokenFetchStates.Error,
        } as ErrorMessage)
      : undefined;

  const tokenAmtRules: RegisterOptions = {
    required: true,
    setValueAs: val => {
      if (val === '') return '';

      return toBaseUnits(val, tokenData?.decimals);
    },
    ...props.rules,
  };

  const tokenAddressRules: RegisterOptions = {
    required: true,
    ...props.rules,
  };

  const handleMax = () => {
    if (tokenData) {
      setValue(amtId, toWholeUnits(tokenData.balance, tokenData?.decimals));
    }
  };

  const maxButton = tokenData?.balance && tokenData?.decimals && (
    <Button color='secondary' size='sm' onClick={handleMax} type='button'>
      Max:{' '}
      {formatValueTo({
        value: toWholeUnits(tokenData?.balance, tokenData?.decimals),
        decimals: 6,
        format: 'number',
      })}
    </Button>
  );

  return (
    <>
      <FieldSpacer>
        <WrappedSelect
          full
          label='Tribute Token'
          id={addressId}
          helperText={fetchState}
          success={tokenName}
          error={tokenError}
          rules={tokenAddressRules}
          disabled={disabled}
          placeholder='Select a token'
          options={tokenList}
        />
        {needsApproval &&
          tokenData &&
          fetchState !== TokenFetchStates.Loading && (
            <TemporaryWarning
              setNeedsApproval={setNeedsApproval}
              tokenName={tokenData?.tokenName}
              tokenAddress={tokenAddress}
            />
          )}
      </FieldSpacer>
      <FieldSpacer>
        <WrappedInput
          full
          label='Tribute Token Amount'
          id={amtId}
          disabled={needsApproval || disabled}
          rules={tokenAmtRules}
          rightAddon={maxButton}
          defaultValue='0'
        />
      </FieldSpacer>
    </>
  );
};

enum TxStates {
  Idle = 'Idle',
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Token Approved!',
}

const TemporaryWarning = ({
  tokenName,
  tokenAddress,
  setNeedsApproval,
}: {
  tokenName?: string;
  tokenAddress?: string;
  setNeedsApproval: ReactSetter<boolean>;
}) => {
  const { fireTransaction } = useTxBuilder();
  const [txState, setTxState] = useState(TxStates.Idle);
  const { errorToast, successToast } = useToast();

  const handleApprove = async () => {
    setTxState(TxStates.Loading);

    await fireTransaction({
      tx: APPROVE_TX,
      callerState: {
        tokenAddress,
      },
      lifeCycleFns: {
        onTxError(error) {
          const errMsg = handleErrorMessage({ error });
          setTxState(TxStates.Error);
          errorToast({ title: TxStates.Error, description: errMsg });
        },
        onTxSuccess() {
          setNeedsApproval(false);
          setTxState(TxStates.Success);
          successToast({
            title: TxStates.Success,
            description: `DAOhaus is approved to spend ${tokenName} on your behalf.`,
          });
        },
      },
    });
  };

  return (
    <FieldAlert
      className='warning'
      message={`You must approve ${tokenName || 'Token'} to submit`}
    >
      <Button size='sm' onClick={handleApprove}>
        {txState === TxStates.Loading ? 'Loading...' : 'Approve'}
      </Button>
    </FieldAlert>
  );
};
