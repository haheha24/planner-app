import type { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";
import connectDB from "../../../../middleware/connectDB";
import User from "../../../../models/user";

/**
 * Method DELETE that uses mongoose.Model.findOneAndUpdate method. Send userId and cardId through req.body to delete a user card.
 */
const deleteCard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    //Destructure
    const { id } = req.query;
    if (typeof id === "string") {
      try {
        //Type cast ObjectId
        const objCardId = new Types.ObjectId(id);
        //Query update to remove specific card by id
        const deleteCard = await User.findOneAndUpdate(
          { "cards._id": objCardId },
          { $pull: { cards: { _id: objCardId } } }
        );
        //Send response
        res.status(200).send({ delete: true, user: deleteCard });
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

export default connectDB(deleteCard);