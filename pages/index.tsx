import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Button from "../components/styles/Button.styled";
import { useToggleContext } from "../hooks/ThemeContext";
import type { IUserTheme } from "../hooks/ThemeContext";
import cookie from "cookie";

interface IPageTheme {
  themeCookie: { themeMode: string };
}

const Home: NextPage<IPageTheme> = ({ themeCookie }) => {
  const { dispatch, setToggleState } = useToggleContext();

  useEffect(() => {
    try {
      const parsedCookie: IUserTheme = JSON.parse(themeCookie.themeMode);
      //update state if theme props exist - prevents updating with undefined
      if (parsedCookie.theme) {
        dispatch({
          type: parsedCookie._storedToggle,
          payload: {
            theme: parsedCookie.theme,
            icontheme: parsedCookie.iconTheme,
          },
        });
        setToggleState(parsedCookie._storedToggle);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(
          `${error}: Error may have occured due to first user visit and no theme has been stored as a cookie. Try refreshing or changing the theme`
        );
      } else {
        console.error(error);
      }
    }
  }, []);
  const [state, setState] = useState(0);
  return (
    <>
      <div>{state}</div>
      <Button onClick={() => setState(state + 1)}>Increment</Button>
      <Button onClick={() => setState(state - 1)}>Decrement</Button>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const themeCookie = cookie.parse(ctx.req.headers.cookie || "");
  //Wraps the cookie inside props:themeCookie. Must be unpacked in Home functional argument
  return { props: { themeCookie } };
};
