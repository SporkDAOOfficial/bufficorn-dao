import { MolochFields } from "@daohaus/moloch-v3-fields";
import { FieldLegoBase, FormLegoBase } from "@daohaus/utils";
import { TestField } from "../components/customFields/fieldTest";
import { BufficornTributeInput } from "../components/customFields/BufficornTributeInput";

export const AppFieldLookup = {
  ...MolochFields,
  testField: TestField,
  bufficornTribute: BufficornTributeInput,
};

export type CustomFieldLego = FieldLegoBase<typeof AppFieldLookup>;
export type CustomFormLego = FormLegoBase<typeof AppFieldLookup>;
