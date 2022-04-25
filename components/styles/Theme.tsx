export type typeTheme = {
  [theme: string]: {
    text: string;
    body: string;
  };
};

export const theme = {
  color: {
    white: "#fff",
    black: "#000",
    grey: "#888",
  },
  lightTheme: {
    text: "#000",
    body: "#fff",
  },
  darkTheme: {
    text: "#fff",
    body: "#333333",
  },
  button: {
    color: {
      red: "red",
    },
  },
};
