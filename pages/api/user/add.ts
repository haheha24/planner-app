import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/connectDB";
import User, { IUser } from "../../../models/user";

/**
 * Req.body requires an name, password and email object that will be stored in the DB
 * as a new user.
 */
const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Confirm method is POST request, destructure and try saving new document
  if (req.method === "POST") {
    //Destructure
    const { name, password, email } = req.body;
    if (name && password && email) {
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
        res.status(200).send({ added: true, user: userCreated });
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

export default connectDB(addUser);
