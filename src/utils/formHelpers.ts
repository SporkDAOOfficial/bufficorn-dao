import { PROPOSAL_FORMS } from "@daohaus/moloch-v3-legos";

import { CustomFormLego } from "../legos/fieldConfig";
import { APP_FORM } from "../legos/forms";

export const getFormLegoByIdApp = (
  id: CustomFormLego["id"]
): CustomFormLego | undefined => {
  const allForms = { ...PROPOSAL_FORMS, ...APP_FORM };
  const formKey = Object.keys(allForms).find((key: string) => {
    return allForms[key].id === id;
  });
  if (!formKey) return;
  return allForms[formKey];
};
