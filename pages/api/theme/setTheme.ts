import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      res
        .setHeader(
          "Set-Cookie",
          cookie.serialize("themeMode", JSON.stringify(req.body.userTheme), {
            /* httpOnly: true, */
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
          })
        )
        .status(200)
        .json({ success: true });
      return;
    } catch {
      res.status(500).json({
        success: false,
        error: `unable to set cookie ${req.body.theme}`,
      });
    }
  } else {
    res.status(400).json({ success: false, error: `Request does not exist.` });
  }
};
