import React from "react";
import {
  useConnectedMember,
  useCurrentDao,
  useDaoData,
} from "@daohaus/moloch-v3-hooks";
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
  H3,
  ParSm,
  SingleColumnLayout,
  widthQuery,
} from "@daohaus/ui";
import {
  MetadataSettings,
  ContractSettings,
  GovernanceSettings,
  ShamanSettings,
  TokenSettings,
} from "@daohaus/moloch-v3-macro-ui";
import { Keychain } from "@daohaus/keychain-utils";
import styled from "styled-components";
import { PROPOSAL_FORMS } from "@daohaus/moloch-v3-legos";
import { BsPlusLg } from "react-icons/bs";
import { CustomFormLego } from "../legos/fieldConfig";
import { NewProposalList } from "../components/NewProposalList";
import { ButtonRouterLink } from "../components/ButtonRouterLink";

export const SettingsContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

const SAFE_FORMS = PROPOSAL_FORMS;
delete SAFE_FORMS.MULTICALL_BUILDER;
delete SAFE_FORMS.MULTICALL_BUILDER_SIDECAR;

export const Settings = () => {
  const { daoChain, daoId } = useCurrentDao();
  const { dao } = useDaoData();
  const { isMember, connectedMember } = useConnectedMember();

  const prepareProposals = (proposals: Record<string, CustomFormLego>) => {
    return Object.keys(proposals).map((key) => proposals[key]);
  };

  const allProposals = prepareProposals(SAFE_FORMS);

  return (
    <SingleColumnLayout
      title="Settings"
      actions={
        connectedMember &&
        isMember && (
          <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/member/${connectedMember.memberAddress}`}
            color="primary"
            linkType="no-icon-external"
          >
            My Profile
          </ButtonRouterLink>
        )
      }
    >
      {dao && (
        <>
          <MetadataSettings
            dao={dao}
            daoChain={daoChain as keyof Keychain}
            includeLinks={isMember}
          />

          <TokenSettings
            dao={dao}
            daoChain={daoChain as keyof Keychain}
            includeLinks={isMember}
          />

          <GovernanceSettings
            dao={dao}
            daoChain={daoChain as keyof Keychain}
            includeLinks={isMember}
          />

          <ContractSettings dao={dao} daoChain={daoChain as keyof Keychain} />

          <ShamanSettings
            dao={dao}
            daoChain={daoChain as keyof Keychain}
            includeLinks={isMember}
          />

          {isMember && (
            <SettingsContainer>
              <H3>Proposals</H3>
              <ParSm>All available proposal types.</ParSm>
              <Dialog>
                <DialogTrigger asChild>
                  <Button IconLeft={BsPlusLg}>New Proposal</Button>
                </DialogTrigger>
                <DialogContent title="Choose Proposal Type">
                  <NewProposalList proposals={allProposals} />
                </DialogContent>
              </Dialog>
            </SettingsContainer>
          )}
        </>
      )}
    </SingleColumnLayout>
  );
};
