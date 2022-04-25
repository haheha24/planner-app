import styled from "styled-components";
import { H1 } from "../styles/Heading.styled";
import ThemeToggleBtn from "../buttons/ThemeToggleBtn";

const StyledHeader = styled.header`
  display: flex;
  justify-items: space-around;
  background: ${({theme}) => theme.body}
`

const Header = () => {
  return (
    <StyledHeader>
      <H1>To-Do-Landar</H1>
      <ThemeToggleBtn />
      {/* insert settings button here */}
    </StyledHeader>
  );
};

export default Header;
