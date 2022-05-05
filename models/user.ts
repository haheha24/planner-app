import mongoose from "mongoose";
import { CardSchema, ITodoCardSchema } from "./todoCard";

export interface IUser {
  name: string;
  password: string;
  email: string;
  cards?: ITodoCardSchema[];
}

/*      SCHEMA       */
const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cards: {
    type: [CardSchema],
    required: false,
  },
});

//NextJS doesn't cache mongoose.models correctly, not sure how this fixes it.
//@ts-ignore
mongoose.models = {}

//Must export both due to NextJS not caching model User
const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User
