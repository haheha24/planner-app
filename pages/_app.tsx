import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StyledThemeProvider } from "../hooks/ThemeContext";
import Layout from "../components/layout/Layout";

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
