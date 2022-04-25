export interface IIconTheme {
  color: string;
  size: string;
}

export const lightTheme: IIconTheme = {
  color: "#000",
  size: "1.25em",
};

export const darkTheme: IIconTheme = {
  color: "#fff",
  size: "1.25em",
};

const iconTheme = {
    lightTheme,
    darkTheme
}

export default iconTheme
