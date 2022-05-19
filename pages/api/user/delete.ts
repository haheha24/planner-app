import type { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";
import { isValidObjectId } from "../../../utility/helpers";
import User from "../../../models/user";
import connectDB from "../../../middleware/connectDB";

/**
 * Method DELETE that uses mongoose.Model.findByIdAndDelete method, as well as req.body.id to identify the _id of the User to delete
 */
const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    //Narrow req.query.id typing to string as string[] under NextApiRequest is for [...id].ts pages
    if (typeof req.query.id === "string") {
      const id = req.query.id;

      //validate that both ids are valid mongodb ObjectId
      if (isValidObjectId(id) === false) {
        return res.status(400).send("Not a valid ObjectId");
      }

      //Begin deleting user
      try {
        //Type cast ObjectId
        const objCardId = new Types.ObjectId(id);
        //Query by id and delete user
        const deleteUser = await User.findByIdAndDelete(objCardId);
        //Send response
        return res.status(200).send({ deleted: true, user: deleteUser });
      } catch (error) {
        return res.status(500).send({ error: error });
      }
    } else {
      return res.status(400).send("Bad Request. Query not string");
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "DELETE", reponse: `${req.method} method not supported` });
  }
};

export default connectDB(deleteUser);
