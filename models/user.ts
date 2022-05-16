import mongoose, { Schema } from "mongoose";
/*      TYPES       */
export interface ITodoCardSchema {
  id?: string;
  title: string;
  description: string;
  timeOfDay: string;
  dueDate: string;
  color: string;
  completed: boolean;
}

export interface IUser {
  name: string;
  password: string;
  email: string;
  cards?: ITodoCardSchema[];
}

/*      SCHEMA       */
export const CardSchema = new Schema<ITodoCardSchema>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  timeOfDay: { type: String },
  dueDate: { type: String },
  color: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

export const userSchema = new Schema<IUser>({
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
mongoose.models = {};

//Must export both due to NextJS not caching model User
const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
