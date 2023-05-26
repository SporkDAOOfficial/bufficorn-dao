import { ProposalTypeIds } from "@daohaus/utils";

export const CUSTOM_APP_PROPOSAL_TYPE_LABELS: Record<string, string> = {
  INIT_VOTE: "Initiate Vote",
};

export const CUSTOM_PROPOSAL_TYPE_WARNINGS: Record<
  ProposalTypeIds | string,
  string
> = {
  INIT_VOTE: "Proposal for DAO voting signal. No transactions are executed.",
};
