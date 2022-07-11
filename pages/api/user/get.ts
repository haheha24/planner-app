import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "../../../utility/helpers";
import { mongoHandler } from "../../../middleware";
import User from "../../../models/user";

/**
 * Get user data by querying their id.
 */
const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    if (typeof req.query.id === "string") {
      //Destructure
      const { id } = req.query;

      //validate that both ids are valid mongodb ObjectId
      if (isValidObjectId(id) === false) {
        return res.status(400).send({ error: "Not a valid ObjectId" });
      }
      try {
        //Query id of user
        const getUser = await User.findById(id);
        //Send response
        return res
          .status(200)
          .send({ user: getUser, message: "User query successful" });
      } catch (error) {
        return res.status(500).send({ error: error });
      }
    } else {
      return res
        .status(422)
        .send({ error: "Bad Request. Query is not a string" });
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "GET", error: `${req.method} method not supported` });
  }
};

export default mongoHandler(getUser);
