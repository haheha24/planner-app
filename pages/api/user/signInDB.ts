import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB, validate } from "../../../middleware";
import { signInSchema } from "../../../schemas/dbValidation";
import User from "../../../models/user";

/**
 * Get user data by querying their id.
 */
const signInDB = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (
      typeof req.body.email === "string" &&
      typeof req.body.password === "string"
    ) {
      //Destructure
      const { email, password } = req.body;

      try {
        //Query id of user
        const getUser = await User.findOne({
          email: email,
          password: password,
        });
        //Send response
        return res.status(200).send({ user: getUser });
      } catch (error) {
        return res.status(500).send({ error: error });
      }
    } else {
      return res.status(422).send("Bad Request. Query is not a string");
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "POST", reponse: `${req.method} method not supported` });
  }
};

export default validate(signInSchema, connectDB(signInDB));
