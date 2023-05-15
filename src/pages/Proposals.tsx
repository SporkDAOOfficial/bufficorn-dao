import { ProposalList } from "@daohaus/moloch-v3-macro-ui";
import { Button, Dialog, DialogContent, DialogTrigger } from "@daohaus/ui";
import { BsPlusLg } from "react-icons/bs";
import { NewProposalList } from "../components/NewProposalList";
import { CustomFormLego } from "../legos/fieldConfig";
import { APP_FORM } from "../legos/forms";

export const Proposals = () => {
  const prepareProposals = (proposals: Record<string, CustomFormLego>) => {
    return Object.keys(proposals).map((key) => proposals[key]);
  };

  const basicProposals = prepareProposals(APP_FORM);
  // const allProposals = prepareProposals(PROPOSAL_FORMS);

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
              proposals={basicProposals}
              label="Bufficorn Proposals"
              // advancedProposals={allProposals}
            />
          </DialogContent>
        </Dialog>
      }
    />
  );
};
