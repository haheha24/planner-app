import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { mongoHandler, validate } from "../../middleware";
import User, { IUser } from "../../models/user";
import { registerSchema } from "../../schemas/dbValidation";

/**
 * Req.body requires an name, password and email object that will be stored in the DB
 * as a new user.
 */
const registration = async (req: NextApiRequest, res: NextApiResponse) => {
  // Confirm method is POST request, destructure and try saving new document
  if (req.method === "POST") {
    //Destructure
    const { name, password, email } = req.body;
    try {
      //check if email is not already being used
      const checkUser = await User.findOne({ email: req.body.email });

      if (checkUser.email || (checkUser.email && !checkUser.password)) {
        return res
          .status(200)
          .send({ error: "An account with that email already exists." });
      }
      //Instantiate the User model with the req.body params
      const newUser = new User<IUser>({
        name: name,
        password: password,
        email: email,
        image: null,
        emailVerified: false,
      });
      //salt to hash password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      //Save new model to database
      await newUser.save();
      //Send response
      return res.status(201).send({
        message: "Registered Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "POST", error: `${req.method} method not supported` });
  }
};

export default validate(registerSchema, mongoHandler(registration));
