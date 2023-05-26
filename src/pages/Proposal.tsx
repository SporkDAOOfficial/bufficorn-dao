import styled from "styled-components";
import {
  useConnectedMember,
  useCurrentDao,
  useDaoProposal,
} from "@daohaus/moloch-v3-hooks";
import {
  ProposalActionData,
  ProposalActions,
  ProposalDetails,
  ProposalDetailsContainer,
  ProposalHistory,
} from "@daohaus/moloch-v3-macro-ui";
import { BiColumnLayout, Card, ParLg, Spinner, widthQuery } from "@daohaus/ui";
import {
  DAO_METHOD_TO_PROPOSAL_TYPE,
  getProposalTypeLabel,
  PROPOSAL_TYPE_LABELS,
  PROPOSAL_TYPE_WARNINGS,
  SENSITIVE_PROPOSAL_TYPES,
  TXLego,
} from "@daohaus/utils";
import { PROTECTED_TARGET } from "../targetDao";
import { useDHConnect } from "@daohaus/connect";
import { CUSTOM_PROPOSAL_TYPE_WARNINGS } from "../utils/proposalData";

const LoadingContainer = styled.div`
  margin-top: 5rem;
`;

const OverviewCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  height: fit-content;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const RightCard = styled(Card)`
  width: 45.7rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  height: 100%;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

// TODO: Import TxLegos
const TX: Record<string, TXLego> = {};

export const Proposal = () => {
  const { proposal } = useDaoProposal();
  const { daoChain, daoId } = useCurrentDao();

  const { address } = useDHConnect();
  const { isMember } = useConnectedMember({
    daoChain: PROTECTED_TARGET.CHAIN_ID,
    daoId: PROTECTED_TARGET.ADDRESS,
    memberAddress: address || null,
  });

  if (!daoChain || !daoId)
    return (
      <LoadingContainer>
        <ParLg>DAO Not Found</ParLg>
      </LoadingContainer>
    );

  if (!proposal)
    return (
      <LoadingContainer>
        <Spinner size="6rem" />
      </LoadingContainer>
    );

  if (!isMember)
    return (
      <LoadingContainer>
        <ParLg>Members Only</ParLg>
      </LoadingContainer>
    );

  return (
    <BiColumnLayout
      title={proposal?.title}
      subtitle={`${proposal?.proposalId} | ${getProposalTypeLabel(
        proposal?.proposalType,
        PROPOSAL_TYPE_LABELS
      )}`}
      left={
        <OverviewCard>
          {daoChain && daoId && proposal && (
            <ProposalDetailsContainer
              daoChain={daoChain}
              daoId={daoId}
              proposal={proposal}
              includeLinks={true}
              proposalActionConfig={{
                sensitiveProposalTypes: SENSITIVE_PROPOSAL_TYPES,
                actionToProposalType: DAO_METHOD_TO_PROPOSAL_TYPE,
                proposalTypeWarning: {
                  ...PROPOSAL_TYPE_WARNINGS,
                  ...CUSTOM_PROPOSAL_TYPE_WARNINGS,
                },
              }}
            />
          )}
        </OverviewCard>
      }
      right={
        <RightCard>
          <ProposalActions
            proposal={proposal}
            daoChain={daoChain}
            daoId={daoId}
          />
          <ProposalHistory
            proposalId={proposal.proposalId}
            daoChain={daoChain}
            daoId={daoId}
            includeLinks
          />
        </RightCard>
      }
    />
  );
};
