import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "../../../../utility/helpers";
import { mongoHandler } from "../../../../middleware";
import User from "../../../../models/user";

/**
 * Gets the user's card data by querying the user and user's card id. Returns it as JSON
 */
const getCard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    if (
      typeof req.query.userId === "string" &&
      typeof req.query.cardId === "string"
    ) {
      //Destructure
      const { userId, cardId } = req.query;

      //validate that both ids are valid mongodb ObjectId
      if (
        isValidObjectId(userId) === false ||
        isValidObjectId(cardId) === false
      ) {
        return res.status(400).send("Not a valid ObjectId");
      }

      try {
        //Query user and then card id
        const findCard = await User.findById(userId).then((user) =>
          user.cards.id(cardId)
        );
        //Send response
        return res
          .status(200)
          .json({ card: findCard, message: "Query successful" });
      } catch (error) {
        return res.status(500).send({ error: error });
      }
    } else {
      return res
        .status(400)
        .send({ error: "Bad Request. One or both query is not a string" });
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "GET", error: `${req.method} method not supported` });
  }
};

export default mongoHandler(getCard);
