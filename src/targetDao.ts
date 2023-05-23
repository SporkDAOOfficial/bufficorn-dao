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
};

export const PROTECTED_TARGET = TARGET_DAO[import.meta.env.VITE_TARGET_KEY];
