import type { NextApiRequest, NextApiResponse } from "next";
import { mongoHandler, validate } from "../../../../middleware";
import User from "../../../../models/user";
import { addCardSchema } from "../../../../schemas/dbValidation";

/**
 * POST method to req.body. Send id, title, description, timeOfDay, dueDate and color in request.
 * Adds a new card with the supplied params. id is the user id. id, title and description required, the rest are optional.
 */
const addCard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //Destructure
    const { id, title, description, timeOfDay, dueDate, color } = req.body;
    try {
      //Instantiate the new card to be added
      const newCard = {
        title: title,
        description: description,
        timeOfDay: timeOfDay || "",
        dueDate: dueDate || "",
        color: color || "#fff",
        completed: false,
      };
      //Query update to push and return newest card - last in the array
      const addCard = await User.findOneAndUpdate(
        { _id: id },
        //@ts-ignore
        { $push: { cards: newCard } },
        { new: true }
      )
        .select({ cards: { $slice: -1 } })
        //@ts-ignore
        .then((user) => user.cards[0]);
      //Send response
      return res
        .status(201)
        .send({ card: addCard, message: "Added card successfully" });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "POST", error: `${req.method} method not supported` });
  }
};

export default validate(addCardSchema, mongoHandler(addCard));
