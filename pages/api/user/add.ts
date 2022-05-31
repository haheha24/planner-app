import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/connectDB";
import validate from "../../../middleware/validate";
import User, { IUser } from "../../../models/user";
import { addUserSchema } from "../../../schemas/dbValidation";

/**
 * Req.body requires an name, password and email object that will be stored in the DB
 * as a new user.
 */
const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Confirm method is POST request, destructure and try saving new document
  if (req.method === "POST") {
    //Destructure
    const { name, password, email } = req.body;
    try {
      //Instantiate the User model with the req.body params
      let newUser = new User<IUser>({
        name: name,
        password: password,
        email: email,
      });
      //Save new model to database
      const userCreated = await newUser.save();
      //Send response
      return res.status(201).send({ added: true, user: userCreated });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "POST", reponse: `${req.method} method not supported` });
  }
};

export default validate(addUserSchema, connectDB(addUser));
