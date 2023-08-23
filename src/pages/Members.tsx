import { useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { MemberList } from '@daohaus/moloch-v3-macro-ui';
import {
  SingleColumnLayout,
  Loading,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { ButtonRouterLink } from '../components/ButtonRouterLink';
import styled from 'styled-components';

const Actions = styled.div`
  display: flex;
  width: 100%;
  button:first-child {
    margin-right: 1rem;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button:first-child {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;

export const Members = () => {
  const { daoChain, daoId } = useCurrentDao();
  const isMd = useBreakpoint(widthQuery.md);

  return (
    <SingleColumnLayout
      title='Partners'
      actions={
        <Actions>
          <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=ADD_PARTNER`}
            color='secondary'
            linkType='no-icon-external'
          >
            Add Partner
          </ButtonRouterLink>
          <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=BECOME_PARTNER`}
            color='secondary'
            linkType='no-icon-external'
          >
            Become Partner
          </ButtonRouterLink>
        </Actions>
      }
    >
      {!daoChain || !daoId ? (
        <Loading size={isMd ? 8 : 16} padding='6rem' />
      ) : (
        <MemberList
          daoChain={daoChain}
          daoId={daoId}
          allowLinks={true}
          allowMemberMenu={false}
        />
      )}
    </SingleColumnLayout>
  );
};
