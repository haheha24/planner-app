import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../middleware/connectDB";
import User from "../../../../models/user";

/**
 * Gets the user's card data by querying the user and user's card id. Returns it as JSON
 */
const getCard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    //Destructure
    const { userId, cardId } = req.query;
    if (typeof userId === "string" && typeof cardId === "string") {
      try {
        //Query user and then card id
        const findCard = await User.findById(userId).then((user) =>
          user.cards.id(cardId)
        );
        //Send response
        res.status(200).json(findCard);
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

export default connectDB(getCard);
