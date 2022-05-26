import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>Copyright © Adrian Cristallo</div>
    </StyledFooter>
  );
};

export default Footer;
