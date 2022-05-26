import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
};

export default Layout;
