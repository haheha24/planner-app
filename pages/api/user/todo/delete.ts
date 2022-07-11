import { IUser, ITodoCardSchema } from "./../../../../models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { ModifyResult, Types } from "mongoose";
import { isValidObjectId } from "../../../../utility/helpers";
import { mongoHandler } from "../../../../middleware";
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
        await User.findOneAndUpdate(
          { "cards._id": objCardId },
          //@ts-ignore
          { $pull: { cards: { _id: objCardId } } }
          //@ts-ignore
        ); /* .then((user) => user.cards); */
        //Send response
        return res.status(200).send({ message: "Deleted card successfully" });
      } catch (error) {
        return res.status(500).send({ error: error });
      }
    } else {
      return res.status(400).send({ error: "Bad Request. Query not string" });
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "DELETE", error: `${req.method} method not supported` });
  }
};

export default mongoHandler(deleteCard);
