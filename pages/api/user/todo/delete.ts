import type { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";
import { isValidObjectId } from "../../../../utility/helpers";
import connectDB from "../../../../middleware/connectDB";
import User from "../../../../models/user";

/**
 * Method DELETE that uses mongoose.Model.findOneAndUpdate method. Send userId and cardId through req.body to delete a user card.
 */
const deleteCard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    //Narrow req.query.id typing to string as string[] under NextApiRequest is for [...id].ts pages
    if (typeof req.query.id === "string") {
      const id = req.query.id;

      //validate that both ids are valid mongodb ObjectId
      if (isValidObjectId(id) === false) {
        return res.status(400).send("Not a valid ObjectId");
      }

      //Begin deleting user card
      try {
        //Type cast ObjectId
        const objCardId = new Types.ObjectId(id);
        //Query update to remove specific card by id
        const deleteCard = await User.findOneAndUpdate(
          { "cards._id": objCardId },
          { $pull: { cards: { _id: objCardId } } }
        ).then((user) => user.cards);
        //Send response
        return res.status(200).send({ delete: true, user: deleteCard });
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

export default connectDB(deleteCard);
