import { NestedArray, POSTER_TAGS, TXLego, ValidArgType } from "@daohaus/utils";
import { buildMultiCallTX } from "@daohaus/tx-builder";
import { APP_CONTRACT } from "./contract";
import { CONTRACT } from "@daohaus/moloch-v3-legos";

export enum ProposalTypeIds {
  Signal = "SIGNAL",
  IssueSharesLoot = "ISSUE",
  AddShaman = "ADD_SHAMAN",
  TransferErc20 = "TRANSFER_ERC20",
  TransferNetworkToken = "TRANSFER_NETWORK_TOKEN",
  UpdateGovSettings = "UPDATE_GOV_SETTINGS",
  UpdateTokenSettings = "TOKEN_SETTINGS",
  TokensForShares = "TOKENS_FOR_SHARES",
  GuildKick = "GUILDKICK",
  WalletConnect = "WALLETCONNECT",
  InitVote = "INIT_VOTE",
  BecomePartner = "BECOME_PARTNER",
  AddPartner = "ADD_PARTNER",
  FundCompany = "FUND_COMPANY",
}

const nestInArray = (arg: ValidArgType | ValidArgType[]): NestedArray => {
  return {
    type: "nestedArray",
    args: Array.isArray(arg) ? arg : [arg],
  };
};

export const APP_TX: Record<string, TXLego> = {
  INIT_VOTE: buildMultiCallTX({
    id: "INIT_VOTE",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: ProposalTypeIds.InitVote },
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.POSTER,
        method: "post",
        args: [
          {
            type: "JSONDetails",
            jsonSchema: {
              title: `.formValues.title`,
              description: `.formValues.description`,
              contentURI: `.formValues.link`,
              contentURIType: { type: "static", value: "url" },
              proposalType: { type: "static", value: ProposalTypeIds.InitVote },
            },
          },
          { type: "static", value: POSTER_TAGS.signalProposal },
        ],
      },
    ],
  }),
  BECOME_PARTNER: {
    id: "BECOME_PARTNER",
    contract: CONTRACT.TRIBUTE_MINION,
    method: "submitTributeProposal",
    args: [
      ".daoId",
      ".formValues.tokenAddress",
      ".formValues.tokenAmount",
      ".formValues.sharesRequested",
      ".formValues.lootRequested",
      {
        type: "proposalExpiry",
        search: ".formValues.proposalExpiry",
        fallback: 0,
      },
      {
        type: "static",
        value: "0",
      },
      {
        type: "JSONDetails",
        jsonSchema: {
          title: ".formValues.title",
          description: ".formValues.description",
          contentURI: `.formValues.link`,
          contentURIType: { type: "static", value: "url" },
          proposalType: {
            type: "static",
            value: ProposalTypeIds.BecomePartner,
          },
        },
      },
    ],
  },
  ADD_PARTNER: buildMultiCallTX({
    id: "ADD_PARTNER",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: ".formValues.title",
        description: ".formValues.description",
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: {
          type: "static",
          value: ProposalTypeIds.AddPartner,
        },
      },
    },
    actions: [
      {
        contract: CONTRACT.CURRENT_DAO,
        method: "mintShares",
        args: [
          nestInArray(".formValues.recipient"),
          nestInArray(".formValues.sharesRequested"),
        ],
      },
      {
        contract: CONTRACT.CURRENT_DAO,
        method: "mintLoot",
        args: [
          nestInArray(".formValues.recipient"),
          nestInArray(".formValues.lootRequested"),
        ],
      },
    ],
  }),
  FUND_COMPANY: buildMultiCallTX({
    id: "FUND_COMPANY",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: ".formValues.title",
        description: ".formValues.description",
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: {
          type: "static",
          value: ProposalTypeIds.FundCompany,
        },
      },
    },
    actions: [
      {
        contract: CONTRACT.ERC_20_FUNDING,
        method: "transfer",
        args: [".formValues.recipient", ".formValues.paymentTokenAmt"],
      },
    ],
  }),
};
