import { Link as RouterLink } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri/index.js";
import styled from "styled-components";
import { Bold, border, DataSm, ParMd, Tabs, Theme } from "@daohaus/ui";
import { CustomFormLego } from "../legos/fieldConfig";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";

const ListContainer = styled.div`
  margin-top: 2.5rem;
`;

const ListItemContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-top: 1px ${({ theme }: { theme: any }) => theme.secondary.step6} solid;
`;

const ListItemLink = styled(RouterLink)`
  text-decoration: none;
  width: 100%;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

const ListItemHoverContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-radius: ${border.radius};

  &:hover {
    background: 1px ${({ theme }: { theme: any }) => theme.secondary.step3};
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  word-wrap: break-word;
  max-width: 39rem;
`;

const StyledIcon = styled(RiArrowRightSLine)`
  fill: ${({ theme }: { theme: any }) => theme.primary.step9};
  font-size: 3rem;
`;

type NewProposalListProps = {
  proposals: CustomFormLego[];
};

const ProposalList = ({ proposals }: { proposals: CustomFormLego[] }) => {
  const { daoChain, daoId } = useCurrentDao();

  return (
    <div>
      {proposals.map((proposalLego: CustomFormLego) => (
        <ListItemContainer key={proposalLego.id}>
          <ListItemLink
            to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=${proposalLego.id}`}
          >
            <ListItemHoverContainer>
              <ListItem>
                <ParMd>
                  <Bold>{proposalLego.title}</Bold>
                </ParMd>
                <DataSm>{proposalLego.description}</DataSm>
              </ListItem>
              <StyledIcon />
            </ListItemHoverContainer>
          </ListItemLink>
        </ListItemContainer>
      ))}
    </div>
  );
};

export const NewProposalList = ({ proposals }: NewProposalListProps) => {
  return (
    <ListContainer>
      <ProposalList proposals={proposals} />
    </ListContainer>
  );
};
