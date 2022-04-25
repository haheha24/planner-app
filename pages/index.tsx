import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Button from "../components/styles/Button.styled";
import { useToggleContext } from "../hooks/ThemeContext";
import type { IUserTheme } from "../hooks/ThemeContext";

interface IPageTheme {
  userTheme?: IUserTheme;
}

const Home: NextPage<IPageTheme> = ({ userTheme }) => {
  const { dispatch, setToggleState } = useToggleContext();
  useEffect(() => {
    if (userTheme) {
      console.log(userTheme)
      dispatch({
        type: userTheme._storedToggle,
        payload: { theme: userTheme.theme, icontheme: userTheme.iconTheme },
      });
      /* setToggleState(userTheme._storedToggle); */ //Breaks the button if userTheme is an empty {}
    } else {
      console.log(userTheme, "did not work");
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

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/theme/getTheme", {
    method: "POST",
    headers: { "Content-Type": "Application/JSON" },
  });
  const userTheme = await res.json();
  return { props: { userTheme } };
};
