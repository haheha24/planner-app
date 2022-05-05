import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import connectDB from "../../../middleware/connectDB";

interface IUserUpdate {
  name: string;
  password: string;
  email: string;
}

interface IReqBody {
  userId: { _id: string };
  update: IUserUpdate;
}

const editUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Confirm method is PATCH request
  if ((req.method = "PATCH")) {
    // Destructure
    const { userId, update }: IReqBody = req.body;
    if (typeof userId === "string" && update) {
      try {
        //Update query, returning new data
        const updateUserFields = await User.findOneAndUpdate(
          { _id: userId },
          update,
          {
            new: true,
          }
        );
        //Send response
        res.status(200).send({updated: true, user: updateUserFields});
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

export default connectDB(editUser);
