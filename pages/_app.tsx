import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { StyledThemeProvider } from "../hooks/ThemeContext";

//Mocks
if (process.env.NEXT_PUBLIC_API_MOCKING === "true") {
  import("../mocks").then(({ setupMocks }) => {
    setupMocks();
  });
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <StyledThemeProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </StyledThemeProvider>
  );
}

export default MyApp;
