import type { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { useUpdateThemeOnce } from "../../hooks/ThemeContext";
import type { IUserTheme } from "../../hooks/ThemeContext";

export default function SignIn({ providers, themeMode }: any) {
  //load and preserve user theme settings
  const parsedCookie: IUserTheme = JSON.parse(themeMode);
  useUpdateThemeOnce(parsedCookie);

  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  //Get providers
  const providers = await getProviders();
  //Get stored user theme cookie
  const parsedCookie = req.cookies;
  let { themeMode } = parsedCookie;

  if (themeMode === undefined) {
    themeMode = JSON.stringify({
      theme: { text: "#000", body: "#fff" },
      _storedToggle: "light",
      iconTheme: { color: "#000", size: "1.25em" },
    });
    return { props: { themeMode } };
  }
  return {
    props: { providers, themeMode },
  };
};
