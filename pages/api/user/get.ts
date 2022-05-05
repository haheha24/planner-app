import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/connectDB";
import User from "../../../models/user";

/**
 * Get user data by querying their id. 
 */
const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    //Destructure
    const { id } = req.query;
    if (id) {
      try {
        //Query id of user
        const getUser = await User.findById(id);
        //Send response
        res.status(200).send({ user: getUser });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    } else {
      res.status(422).send("Data incomplete");
    }
  } else {
    res.status(422).send("Req method not supported");
  }
};

export default connectDB(getUser);
