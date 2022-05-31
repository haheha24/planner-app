import {
  useEffect,
  useState,
  useReducer,
  useContext,
  createContext,
  SetStateAction,
} from "react";
import type { Dispatch } from "react";
import { ThemeProvider } from "styled-components";
import { IconContext } from "react-icons";
import iconTheme, { IIconTheme } from "../components/styles/IconTheme";
import { theme } from "../components/styles/Theme";

/* Types */
export type themeToggleCtxState = {
  themeState: IUserTheme;
  dispatch: Dispatch<IThemeActions>;
  toggleState: string;
  setToggleState: Dispatch<SetStateAction<string>>;
};

export interface IThemeState {
  text: string;
  body: string;
}

export interface IUserTheme {
  theme: IThemeState;
  _storedToggle: string;
  iconTheme: IIconTheme;
}

export interface IThemeActions {
  type: string;
  payload: { theme: IThemeState; icontheme: IIconTheme };
}

const themeReducer = (state: IUserTheme, action: IThemeActions) => {
  switch (action.type) {
    case "light":
      state.theme = action.payload.theme;
      state.iconTheme = action.payload.icontheme;
      state._storedToggle = action.type;
      return state;
    case "dark":
      state.theme = action.payload.theme;
      state.iconTheme = action.payload.icontheme;
      state._storedToggle = action.type;
      return state;
    default:
      return state;
  }
};

//theme context
const themeToggleContext = createContext({} as themeToggleCtxState);

//theme provider to be imported
/**
 * ThemeProvider with Global Styles and Icon context
 * switch reducer function to update theme, iconTheme and _storedToggle.
 * API request to store state as cookie to save theme.
 */
export const StyledThemeProvider = ({ children }: any) => {
  //to help track the reducer Type case
  const [toggleState, setToggleState] = useState("light");

  // initial value of state
  const initState: IUserTheme = {
    theme: theme.lightTheme,
    _storedToggle: "light",
    iconTheme: iconTheme.lightTheme,
  };

  //useReducer that controls the theme - theme, _storedToggle & iconTheme
  const [themeState, dispatch] = useReducer(themeReducer, initState);

  //API call to store state as a cookie
  useEffect(() => {
    const setCookieTheme = async (theme: IUserTheme) => {
      const res = await fetch("/api/theme/setTheme", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userTheme: theme }),
      });
      return res;
    };
    if (themeState._storedToggle === "light") {
      setCookieTheme(themeState);
    } else if (themeState._storedToggle === "dark") {
      setCookieTheme(themeState);
    }
  }, [toggleState]);

  //return HOC provider
  return (
    <themeToggleContext.Provider
      value={{ themeState, dispatch, toggleState, setToggleState }}
    >
      <ThemeProvider theme={themeState.theme}>
        <IconContext.Provider value={themeState.iconTheme}>
          {children}
        </IconContext.Provider>
      </ThemeProvider>
    </themeToggleContext.Provider>
  );
};

//Consumer to be imported
export const useToggleContext = () => {
  return useContext(themeToggleContext);
};

//Theme Updater
export const useUpdateThemeOnce = (theme: IUserTheme) => {
  const { dispatch, setToggleState } = useToggleContext();
  useEffect(() => {
    //update state if theme props exist - prevents updating with undefined
    dispatch({
      type: theme._storedToggle,
      payload: {
        theme: theme.theme,
        icontheme: theme.iconTheme,
      },
    });
    setToggleState(theme._storedToggle);
  }, []);
};
