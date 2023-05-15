import { ProposalList } from "@daohaus/moloch-v3-macro-ui";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { Button, Dialog, DialogContent, DialogTrigger } from "@daohaus/ui";
import { BsPlusLg } from "react-icons/bs";
import { NewProposalList } from "../components/NewProposalList";
import { PROPOSAL_FORMS } from "@daohaus/moloch-v3-legos";
import { CustomFormLego } from "../legos/fieldConfig";
import { APP_FORM } from "../legos/forms";

export const Proposals = () => {
  const { daoId, daoChain } = useCurrentDao();

  const bufficornProposals = [];

  console.log("PROPOSAL_FORMS", PROPOSAL_FORMS);

  const prepareProposals = (proposals: Record<string, CustomFormLego>) => {
    return Object.keys(proposals).map((key) => proposals[key]);
  };

  const basicProposals = prepareProposals(APP_FORM);
  const allProposals = prepareProposals(PROPOSAL_FORMS);

  return (
    <ProposalList
      header="Proposals"
      allowLinks={true}
      rightActionEl={
        <Dialog>
          <DialogTrigger asChild>
            <Button IconLeft={BsPlusLg}>New Proposal</Button>
          </DialogTrigger>
          <DialogContent title="Choose Proposal Type">
            <NewProposalList
              basicProposals={basicProposals}
              advancedProposals={allProposals}
            />
          </DialogContent>
        </Dialog>
      }
    />
  );
};
