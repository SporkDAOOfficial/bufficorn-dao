import { FIELD, TX } from "@daohaus/moloch-v3-legos";
import { CustomFormLego } from "./fieldConfig";
import { APP_TX } from "./tx";

const PROPOSAL_SETTINGS_FIELDS = [FIELD.PROPOSAL_EXPIRY, FIELD.PROP_OFFERING];

export const APP_FORM: Record<string, CustomFormLego> = {
  INIT_VOTE: {
    id: "INIT_VOTE",
    title: "Initiate Vote",
    subtitle: "Signal Proposal",
    description: "Ratify vote with an on-chain signal.",
    requiredFields: { title: true, description: true },
    log: true,
    tx: APP_TX.INIT_VOTE,
    fields: [
      { ...FIELD.TITLE, label: "Title" },
      FIELD.DESCRIPTION,
      FIELD.LINK,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  FUND_COMPANY: {
    id: "FUND_COMPANY",
    title: "Fund Company",
    subtitle: "Funding Proposal",
    description: "Send ERC-20 tokens from the Treasury.",
    tx: APP_TX.FUND_COMPANY,
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
      { ...FIELD.REQUEST_TOKEN, label: "ERC-20 Tokens" },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  BECOME_PARTNER: {
    id: "BECOME_PARTNER",
    title: "Become Partner",
    subtitle: "Partner Proposal",
    description: "Request BVSTK or BVSTK-LOOT in exchange for ERC-20 tokens.",
    tx: APP_TX.BECOME_PARTNER,
    requiredFields: {
      title: true,
      description: true,
      sharesRequested: true,
      lootRequested: true,
    },
    fields: [
      { ...FIELD.TITLE, label: "Title" },
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        ...FIELD.TO_WEI,
        label: "BVSTK Tokens (Voting)",
        id: "sharesRequested",
      },
      {
        ...FIELD.TO_WEI,
        label: "BVSTK-LOOT Tokens (Non-Voting)",
        id: "lootRequested",
      },
      // FIELD.TRIBUTE,
      {
        id: "tribute",
        type: "bufficornTribute",
        label: "Tribute",
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  ADD_PARTNER: {
    id: "ADD_PARTNER",
    title: "Add Partner",
    subtitle: "Partner Proposal",
    description: "Send BVSTK or BVSTK-LOOT tokens.",
    tx: APP_TX.ADD_PARTNER,
    requiredFields: {
      title: true,
      description: true,
      sharesRequested: true,
      lootRequested: true,
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
        expectType: "ethAddress",
        placeholder: "0x...",
      },
      {
        ...FIELD.TO_WEI,
        label: "BVSTK Tokens (Voting)",
        id: "sharesRequested",
      },
      {
        ...FIELD.TO_WEI,
        label: "BVSTK-LOOT Tokens (Non-Voting)",
        id: "lootRequested",
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
};
