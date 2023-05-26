import { ProposalList } from "@daohaus/moloch-v3-macro-ui";
import { Button, Dialog, DialogContent, DialogTrigger } from "@daohaus/ui";
import { BsPlusLg } from "react-icons/bs";
import { NewProposalList } from "../components/NewProposalList";
import { CustomFormLego } from "../legos/fieldConfig";
import { APP_FORM } from "../legos/forms";
import { useConnectedMember } from "@daohaus/moloch-v3-hooks";
import { useDHConnect } from "@daohaus/connect";
import { PROTECTED_TARGET } from "../targetDao";
import { CUSTOM_APP_PROPOSAL_TYPE_LABELS } from "../utils/proposalData";

export const Proposals = () => {
  const prepareProposals = (proposals: Record<string, CustomFormLego>) => {
    return Object.keys(proposals).map((key) => proposals[key]);
  };

  const basicProposals = prepareProposals(APP_FORM);

  const { address } = useDHConnect();
  const { isMember } = useConnectedMember({
    daoChain: PROTECTED_TARGET.CHAIN_ID,
    daoId: PROTECTED_TARGET.ADDRESS,
    memberAddress: address || null,
  });

  return (
    <ProposalList
      header="Proposals"
      allowLinks={isMember}
      customProposalTypeLabels={CUSTOM_APP_PROPOSAL_TYPE_LABELS}
      rightActionEl={
        <Dialog>
          <DialogTrigger asChild>
            <Button IconLeft={BsPlusLg}>New Proposal</Button>
          </DialogTrigger>
          <DialogContent title="Choose Proposal Type">
            <NewProposalList proposals={basicProposals} />
          </DialogContent>
        </Dialog>
      }
    />
  );
};
