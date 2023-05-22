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
import { DaoSettings, GovernanceSettings } from "@daohaus/moloch-v3-macro-ui";
import { Keychain } from "@daohaus/keychain-utils";
import styled from "styled-components";
import { PROPOSAL_FORMS } from "@daohaus/moloch-v3-legos";
import { BsPlusLg } from "react-icons/bs";
import { CustomFormLego } from "../legos/fieldConfig";
import { NewProposalList } from "../components/NewProposalList";

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

export const Settings = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();
  const { isMember } = useConnectedMember();

  const prepareProposals = (proposals: Record<string, CustomFormLego>) => {
    return Object.keys(proposals).map((key) => proposals[key]);
  };

  const allProposals = prepareProposals(PROPOSAL_FORMS);

  return (
    <SingleColumnLayout title="Settings">
      {dao && (
        <>
          <DaoSettings daoChain={daoChain as keyof Keychain} daoId={dao.id} />
          <GovernanceSettings daoChain={daoChain as keyof Keychain} dao={dao} />

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
