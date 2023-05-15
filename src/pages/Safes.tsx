import React from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { SingleColumnLayout } from "@daohaus/ui";
import { SafesList } from "@daohaus/moloch-v3-macro-ui";
import { ButtonRouterLink } from "../components/ButtonRouterLink";

export const Safes = () => {
  const { daoChain, daoId } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout
      title="Treasury"
      actions={
        <ButtonRouterLink
          to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=FUND_COMPANY`}
          color="secondary"
          linkType="no-icon-external"
        >
          Fund Company
        </ButtonRouterLink>
      }
    >
      {dao && daoChain && (
        <SafesList daoChain={daoChain} daoId={dao.id} includeLinks={true} />
      )}
    </SingleColumnLayout>
  );
};
