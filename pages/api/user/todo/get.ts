import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../middleware/connectDB";
import User from "../../../../models/user";

const getCard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { userId, cardId } = req.query;
    if (typeof userId === "string" && typeof cardId === "string") {
      try {
        const findCard = await User.findById(userId).then((user) =>
          user.cards.id(cardId)
        );
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
