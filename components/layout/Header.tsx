import Link from "next/link";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { H1 } from "../styles/Heading.styled";
import Button from "../styles/Button.styled";
import ThemeToggleBtn from "../buttons/ThemeToggleBtn";

const StyledHeader = styled.header`
  display: flex;
  justify-items: space-around;
  background: ${({ theme }) => theme.body};
`;

const Header = () => {
  const { data: session } = useSession();
  //Logged in
  if (session) {
    return (
      <StyledHeader>
        <H1>
          <Link href="/">
            <a>Planner App</a>
          </Link>
        </H1>
        <ThemeToggleBtn />
        {/* insert settings button here */}
        <Button onClick={() => signOut()}>Sign out</Button>
      </StyledHeader>
    );
  }

  //Sign in
  return (
    <StyledHeader>
      <H1>
        <Link href="/">
          <a>Planner App</a>
        </Link>
      </H1>
      <ThemeToggleBtn />
      {/* insert settings button here */}
      <Button onClick={() => signIn()}>Sign in</Button>
    </StyledHeader>
  );
};

export default Header;
