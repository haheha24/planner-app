import Button from "../styles/Button.styled";
import { useToggleContext } from "../../hooks/ThemeContext";
import { theme } from "../styles/Theme";
import iconTheme from "../styles/IconTheme";
import { CgDarkMode } from "react-icons/cg";

const ThemeToggleBtn = () => {
  const { dispatch, toggleState, setToggleState } = useToggleContext();

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (toggleState === "light") {
      dispatch({
        type: "dark",
        payload: { theme: theme.darkTheme, icontheme: iconTheme.darkTheme },
      });
      setToggleState("dark");
    } else if (toggleState === "dark") {
      dispatch({
        type: "light",
        payload: { theme: theme.lightTheme, icontheme: iconTheme.lightTheme },
      });
      setToggleState("light");
    }
  };
  return (
    <Button theme={{ fontSize: "2em" }} onClick={(e) => handleThemeToggle(e)}>
      <CgDarkMode style={{ verticalAlign: "middle" }} />
    </Button>
  );
};
export default ThemeToggleBtn;
