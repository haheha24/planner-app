import mongoose, { Schema, Types } from "mongoose";

/*      TYPES       */
export interface ITodoCardSchema {
  id?: Types.ObjectId;
  title: string;
  description: string;
  timeOfDay: string;
  dueDate: string;
  color: string;
  completed: boolean
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
  }
});
const TodoCard = mongoose.model<ITodoCardSchema>("Todo", CardSchema);

export default TodoCard;
