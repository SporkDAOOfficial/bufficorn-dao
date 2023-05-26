import styled from 'styled-components';
import haus from '../assets/haus.svg';

const Footer = () => {
  return (
    <Wrapper>
      <Xxx>
        <a href="https://bootleggers.wtf/">
          <Built src={haus} alt="Built by Bootleggers on DAOhaus" />
        </a>
      </Xxx>
    </Wrapper>
  );
};

export default Footer;

const Xxx = styled.div`
  display: grid;
  place-items: center;

  @media (min-width: 800px) {
    place-items: end;
  }
`;

const Built = styled.img`
  height: 104px;
`;

const Wrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 0 48px;
`;
