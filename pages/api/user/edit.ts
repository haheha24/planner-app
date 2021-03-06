import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "../../../utility/helpers";
import { mongoHandler, validate } from "../../../middleware";
import User from "../../../models/user";
import { editUserSchema } from "../../../schemas/dbValidation";

interface IReqBody {
  id: string;
  name: string;
  password: string;
  email: string;
}

const editUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Confirm method is PATCH request
  if ((req.method = "PATCH")) {
    // Destructure
    const { id, name, password, email }: Partial<IReqBody> = req.body;

    //validate that both ids are valid mongodb ObjectId
    if (isValidObjectId(id!) === false) {
      return res.status(400).send("Not a valid ObjectId");
    }

    try {
      //Update query, returning new data
      const updateUserFields = await User.findOneAndUpdate(
        { _id: id },
        { name: name, password: password, email: email },
        {
          new: true,
        }
      );
      //Send response
      return res.status(200).send({ message: "Successfuly updated" });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  } else {
    return res
      .status(405)
      .send({ Allow: "PATCH", error: `${req.method} method not supported` });
  }
};

export default validate(editUserSchema, mongoHandler(editUser));
