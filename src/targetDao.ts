import { ValidNetwork } from '@daohaus/keychain-utils';

export const TARGET_DAO: {
  [key: string]: {
    ADDRESS: string;
    SAFE_ADDRESS: string;
    CHAIN_ID: ValidNetwork;
  };
} = {
  '0x8577c1a3caedd9a6bfa431176a9b94474cdffd9c': {
    ADDRESS: '0x8577c1a3caedd9a6bfa431176a9b94474cdffd9c',
    SAFE_ADDRESS: '0xaaa9ffe13a324676a0ff899cf21f09f56e166c6b',
    CHAIN_ID: '0x64',
  },
};
