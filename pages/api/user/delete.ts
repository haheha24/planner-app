import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import connectDB from "../../../middleware/connectDB";

/**
 * Method DELETE that uses mongoose.Model.findByIdAndDelete method, as well as req.body.id to identify the _id of the User to delete
 */
const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Confirm method is DELETE request, assign id object and try deleting document
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (id) {
      try {
        //Delete query and send back response
        const deleteUser = await User.findByIdAndDelete(id);
        return res.status(200).send({ deleted: true, user: deleteUser });
      } catch (error) {
        return res.status(500).send({ error: error });
      }
    } else {
      res.status(422).send("Data incomplete");
    }
  } else {
    res.status(422).send("Req method not supported");
  }
};

export default connectDB(deleteUser);
