import styled from 'styled-components';
import xxx from '../assets/jug.svg';

const Footer = () => {
  return (
    <Wrapper>
      <Xxx>
        <a href="https://bootleggers.wtf/">
          <Jug src={xxx} alt="XXX" />
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

const Jug = styled.img`
  height: 48px;
`;

const Wrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 0 48px;
`;
