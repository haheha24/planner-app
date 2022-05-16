import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "./../../../utility/helper";
import connectDB from "../../../middleware/connectDB";
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
        return res.status(400).send("Not a valid ObjectId");
      }
      try {
        //Query id of user
        const getUser = await User.findById(id);
        //Send response
        return res.status(200).send({ user: getUser });
      } catch (error) {
        return res.status(500).send({ error: error });
      }
    } else {
      return res.status(422).send("Bad Request. Query is not a string");
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "GET", reponse: `${req.method} method not supported` });
  }
};

export default connectDB(getUser);
