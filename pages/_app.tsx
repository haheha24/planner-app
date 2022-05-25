import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StyledThemeProvider } from "../hooks/ThemeContext";
import Layout from "../components/layout/Layout";

//Mocks
if (process.env.NEXT_PUBLIC_API_MOCKING === "true") {
  import("../mocks").then(({ setupMocks }) => {
    setupMocks();
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StyledThemeProvider>
  );
}

export default MyApp;
