import { ValidNetwork } from "@daohaus/keychain-utils";
import { OptionType } from "@daohaus/ui";

export const TARGET_DAO: {
  [key: string]: {
    ADDRESS: string;
    SAFE_ADDRESS: string;
    CHAIN_ID: ValidNetwork;
    TRIBUTE_TOKENS: OptionType[];
  };
} = {
  "0x8577c1a3caedd9a6bfa431176a9b94474cdffd9c": {
    ADDRESS: "0x8577c1a3caedd9a6bfa431176a9b94474cdffd9c",
    SAFE_ADDRESS: "0xaaa9ffe13a324676a0ff899cf21f09f56e166c6b",
    CHAIN_ID: "0x64",
    TRIBUTE_TOKENS: [
      {
        name: "WXDAI",
        value: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
      },
      {
        name: "USDC",
        value: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
      },
      {
        name: "SPICE",
        value: "0x65e1738344EB68c7e2f4279aD9E1f7c253A09911",
      },
    ],
  },
  "0x473ca6a81a5bbcdf235920f37bbcc24d9d5ff1e3": {
    ADDRESS: "0x473ca6a81a5bbcdf235920f37bbcc24d9d5ff1e3",
    SAFE_ADDRESS: "0xa713a8cdb49d694402086bc01f2e53d57bf9e391",
    CHAIN_ID: "0x89",
    TRIBUTE_TOKENS: [
      {
        name: "DAI",
        value: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      },
      {
        name: "USDC",
        value: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      },
      {
        name: "SPORK",
        value: "0x9CA6a77C8B38159fd2dA9Bd25bc3E259C33F5E39",
      },
    ],
  },
  "0x3102fdcaaf1c08116142caaa8f32b647ebf34ba3": {
    ADDRESS: "0x3102fdcaaf1c08116142caaa8f32b647ebf34ba3",
    SAFE_ADDRESS: "0x8b7dc76a734befc2376ea2094dcee48299148d04",
    CHAIN_ID: "0x89",
    TRIBUTE_TOKENS: [
      {
        name: "DAI",
        value: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      },
      {
        name: "USDC",
        value: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      },
      {
        name: "SPORK",
        value: "0x9CA6a77C8B38159fd2dA9Bd25bc3E259C33F5E39",
      },
    ],
  },
};

export const PROTECTED_TARGET = TARGET_DAO[import.meta.env.VITE_TARGET_KEY];
