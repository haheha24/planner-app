import { IUser } from "./../../../../models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/user";
import TodoCard, { ITodoCardSchema } from "../../../../models/todoCard";
import connectDB from "../../../../middleware/connectDB";

/**
 * POST method to req.body. Send id, title, description, timeOfDay, dueDate and color in request.
 * Adds a new card with the supplied params. id is the user id. id, title and description required, the rest are optional.
 */
const addCard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //Destructure
    const { id, title, description, timeOfDay, dueDate, color } = req.body;
    if (id && title && description) {
      try {
        //Instantiate the new card to be added
        const newCard = new TodoCard<ITodoCardSchema>({
          title: title,
          description: description,
          timeOfDay: timeOfDay || "",
          dueDate: dueDate || "",
          color: color || "#fff",
        });
        //Query update to push
        const addCard = await User.findOneAndUpdate(
          { _id: id },
          { $push: { cards: newCard } },
          { new: true, lean: true }
        ).select({ cards: { $slice: -1 } });
        //Send response
        res.status(200).send({ added: true, card: addCard });
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

export default connectDB(addCard);
