import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  try {
    res.status(200);
    res.json(cookies);
  } catch {
    res.status(500);
    res.json({
      success: false,
      cookie: cookies,
      error: `${cookies} does not exist`,
    });
  }
};
