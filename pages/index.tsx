import type { NextPage, GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useUpdateThemeOnce } from "../hooks/ThemeContext";
import type { IUserTheme } from "../hooks/ThemeContext";
import Layout from "../components/layout/Layout";

const Home: NextPage<{ themeMode: string }> = ({ themeMode }) => {
  const { data: session } = useSession();
  const parsedCookie: IUserTheme = JSON.parse(themeMode);
  useUpdateThemeOnce(parsedCookie);

  //Logged in
  if (session) {
    const userName = session.user
      ?.name!.split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(" ");
    return <Layout>{`Welcome ${userName}`}</Layout>;
  }

  //Sign in
  return <Layout>To-Do-lander App</Layout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

  return { props: { themeMode } };
};
