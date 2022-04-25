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
import { GlobalStyles } from "../components/styles/GlobalStyles";
import { IconContext } from "react-icons";
import iconTheme, { IIconTheme } from "../components/styles/IconTheme";
import { theme } from "../components/styles/Theme";

/* Types */
export type themeToggleCtxState = {
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
  type: string
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
    const setTheme = async (theme: IUserTheme) => {
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
      setTheme(themeState);
    } else {
      setTheme(themeState);
    }
  }, [toggleState]);

  //return HOC provider
  return (
    <themeToggleContext.Provider
      value={{ dispatch, toggleState, setToggleState }}
    >
      <ThemeProvider theme={themeState.theme}>
        <GlobalStyles />
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
