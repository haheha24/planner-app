import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import type { ITodoCardSchema } from "../../../../models/todoCard";
import connectDB from "../../../../middleware/connectDB";
import User from "../../../../models/user";

interface IReqBody {
  cardId: string;
  update: ITodoCardSchema;
}

const editCard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { cardId, update }: IReqBody = req.body;

    if (cardId && update) {
      try {
        //helper function(s) to validate and sanitise user input
        const objCardId = new mongoose.Types.ObjectId(cardId);
        const updateCardFields = await User.findOneAndUpdate(
          { "cards._id": objCardId },
          {
            $set: {
              "cards.$.title": update.title || "",
              "cards.$.description": update.description || "",
              "cards.$.timeOfDay": update.timeOfDay || "",
              "cards.$.dueDate": update.dueDate || "",
              "cards.$.color": update.color || "#fff",
            },
          },
          { new: true }
        ).then((user) => {
          return user.cards.id(cardId)
        });
        res.status(200).send({ updated: true, card: updateCardFields });
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

export default connectDB(editCard);
