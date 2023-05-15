import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormBuilder } from "@daohaus/form-builder";
import { useDao } from "@daohaus/moloch-v3-context";

import { AppFieldLookup } from "../legos/fieldConfig";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { getFormLegoByIdApp } from "../utils/formHelpers";

export function NewProposal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshAll } = useDao();
  const { daoChain, daoId } = useCurrentDao();

  const onFormComplete = () => {
    refreshAll?.();
    navigate(`/molochv3/${daoChain}/${daoId}/proposals`);
  };

  const formLego = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const legoId = params.get("formLego");

    if (!legoId) return null;
    return getFormLegoByIdApp(legoId);
  }, [location]);

  const defaults = useMemo(() => {
    if (formLego) {
      const params = new URLSearchParams(location.search);
      const defaultValues = params.get("defaultValues");

      if (!defaultValues) return null;
      return JSON.parse(defaultValues);
    }
    return null;
  }, [location, formLego]);

  if (!formLego) return null;

  return (
    <FormBuilder
      form={formLego}
      defaultValues={defaults}
      customFields={AppFieldLookup}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daoChain}
    />
  );
}

export default NewProposal;
