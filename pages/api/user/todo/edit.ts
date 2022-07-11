import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { mongoHandler, validate } from "../../../../middleware";
import User, { ITodoCardSchema } from "../../../../models/user";
import { editCardSchema } from "../../../../schemas/dbValidation";
import { isValidObjectId, updateObject } from "../../../../utility/helpers";

interface IReqBody {
  id: string;
  update: Partial<ITodoCardSchema>;
}

/**
 * Edits a user's specific card by the id being passed through req.body. Updates each user card field with through an update object.
 * @returns the updated card.
 */
const editCard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { id, update }: IReqBody = req.body;
    try {
      //validate that id is a valid mongodb ObjectId
      if (isValidObjectId(id!) === false) {
        return res.status(400).send("Not a valid ObjectId");
      }

      //Query current card to be updated and destructure to extract without mongoose method properties
      const currentCard = await User.findOne({ id }).then((user) => {
        return user.cards.id(id);
      });

      //salt to hash password
      const salt = await bcrypt.genSalt(10);
      currentCard.password = await bcrypt.hash(currentCard.password, salt);

      const destructuredCard: {
        [key: string]: string | boolean;
      } & Partial<ITodoCardSchema> = {
        title: currentCard.title,
        description: currentCard.description,
        timeOfDay: currentCard.timeOfDay,
        dueDate: currentCard.dueDate,
        color: currentCard.color,
        completed: currentCard.completed,
      };

      for (let prop in destructuredCard) {
        if (destructuredCard[prop] === undefined || null) {
          delete destructuredCard[prop];
        }
      }

      //Created an object with updated fields for the card
      const newUpdatedObject = updateObject(update, destructuredCard);

      //Query card again and update
      await User.findOneAndUpdate(
        { id },
        { $set: newUpdatedObject }
      )/* .then((user) => user.cards.id(id)) */;

      //Send response
      return res.status(200).send({ message: "Updated successfully" });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "PATCH", error: `${req.method} method not supported` });
  }
};

export default validate(editCardSchema, mongoHandler(editCard));
