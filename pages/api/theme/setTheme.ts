// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("themeMode", JSON.stringify(req.body.userTheme), {
        /* httpOnly: true, */
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200);
    res.json({ success: true });
    return
  } catch {
    res.status(500);
    res.json({
      success: false,
      error: `unable to set cookie ${req.body.theme}`,
    });
  }
};
