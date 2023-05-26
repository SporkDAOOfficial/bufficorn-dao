import { DHLayout, useDHConnect } from '@daohaus/connect';
import { TXBuilder } from '@daohaus/tx-builder';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { TARGET_DAO } from '../targetDao';
import { CurrentDaoProvider, useDaoData } from '@daohaus/moloch-v3-hooks';
import { HeaderAvatar } from './HeaderAvatar';
import Footer from './Footer';

const routePath = `molochv3/${
  TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
}/${TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}`;

export const LayoutContainer = () => {
  const location = useLocation();
  const { proposalId, memberAddress } = useParams<{
    proposalId: string;
    memberAddress: string;
  }>();
  const { provider, address } = useDHConnect();
  const { dao } = useDaoData({
    daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
    daoChain: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  });

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[
        { label: 'Home', href: `/` },
        { label: 'Proposals', href: `${routePath}/proposals` },
        { label: 'Partners', href: `${routePath}/members` },
        { label: 'Treasury', href: `${routePath}/safes` },
        { label: 'Settings', href: `${routePath}/settings` },
      ]}
      leftNav={dao && <HeaderAvatar name={dao.name} imgUrl={dao.avatarImg} />}
      footer={<Footer />}
    >
      <CurrentDaoProvider
        targetDao={{
          daoChain: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
          daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
          proposalId,
          memberAddress,
        }}
        userAddress={address}
      >
        <TXBuilder
          provider={provider}
          chainId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
          daoId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}
          safeId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].SAFE_ADDRESS}
          appState={{ dao, memberAddress: address }}
        >
          <Outlet />
        </TXBuilder>
      </CurrentDaoProvider>
    </DHLayout>
  );
};
