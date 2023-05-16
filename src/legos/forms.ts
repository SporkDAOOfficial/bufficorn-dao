import { FIELD, TX } from "@daohaus/moloch-v3-legos";
import { CustomFormLego } from "./fieldConfig";
import { APP_TX } from "./tx";

const PROPOSAL_SETTINGS_FIELDS = [FIELD.PROPOSAL_EXPIRY, FIELD.PROP_OFFERING];

export const APP_FORM: Record<string, CustomFormLego> = {
  INIT_VOTE: {
    id: "INIT_VOTE",
    title: "Initiate Vote",
    subtitle: "Intiate Vote Proposal",
    description: "Ratify on-chain using a DAO proposal.",
    requiredFields: { title: true, description: true },
    log: true,
    tx: APP_TX.INIT_VOTE,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  FUND_COMPANY: {
    id: "FUND_COMPANY",
    title: "Fund Company",
    subtitle: "Funding Proposal",
    description: "Send ERC-20 tokens from the DAO treasury.",
    tx: TX.ISSUE_ERC20,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      { ...FIELD.TITLE, label: "Title" },
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: "recipient",
        type: "input",
        label: "Recipient",
        info: "Address to receive the tokens",
        placeholder: "0x...",
      },
      FIELD.REQUEST_TOKEN,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  BECOME_PARTNER: {
    id: "BECOME_PARTNER",
    title: "Become Partner",
    description:
      "Request voting or non-voting tokens from the DAO in exchange for tokens.",
    subtitle: "Token Proposal",
    tx: TX.TOKENS_FOR_SHARES,
    requiredFields: {
      title: true,
      description: true,
      sharesRequested: true,
      lootRequested: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        ...FIELD.TO_WEI,
        label: "Voting Token Requested",
        id: "sharesRequested",
      },
      {
        ...FIELD.TO_WEI,
        label: "Non-Voting Token Requested",
        id: "lootRequested",
      },
      FIELD.TRIBUTE,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  ADD_PARTNER: {
    id: "ADD_PARTNER",
    title: "Add Partner",
    subtitle: "Token Proposal",
    description: "Request voting or non-voting tokens from the DAO.",
    tx: TX.ISSUE,
    requiredFields: {
      title: true,
      description: true,
      sharesRequested: true,
      lootRequested: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: "recipient",
        type: "input",
        label: "Recipient",
        expectType: "ethAddress",
        placeholder: "0x...",
      },
      {
        ...FIELD.TO_WEI,
        label: "Voting Token Requested",
        id: "sharesRequested",
      },
      {
        ...FIELD.TO_WEI,
        label: "Non-Voting Token Requested",
        id: "lootRequested",
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
};
