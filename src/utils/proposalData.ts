import { ProposalTypeIds } from "@daohaus/utils";

export const CUSTOM_APP_PROPOSAL_TYPE_LABELS: Record<string, string> = {
  INIT_VOTE: "Signal Proposal",
  FUND_COMPANY: "Funding Proposal",
  BECOME_PARTNER: "Partner Proposal",
  ADD_PARTNER: "Partner Proposal",
};

export const CUSTOM_PROPOSAL_TYPE_WARNINGS: Record<
  ProposalTypeIds | string,
  string
> = {
  INIT_VOTE: "Proposal for DAO voting signal. No transactions are executed.",
  FUND_COMPANY: "Proposal transfers ERC-20 tokens from DAO treasury.",
  BECOME_PARTNER:
    "Proposal issues voting and/or non-voting tokens from the DAO",
  ADD_PARTNER: "Proposal issues voting and/or non-voting tokens from the DAO",
};
