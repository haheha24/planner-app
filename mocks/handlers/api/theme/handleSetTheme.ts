import { IUserTheme } from '../../../../hooks/ThemeContext';
import { rest } from "msw";

const handleSetTheme = rest.post<
  IUserTheme,
  { id: string },
  IUserTheme
>("/api/theme/setTheme", (req, res, ctx) => {});

export default handleSetTheme