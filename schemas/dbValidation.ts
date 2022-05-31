import { object, string, bool, TypeOf } from "yup";

export let addUserSchema = object().shape({
  name: string().required().min(2).max(24),
  password: string().required().min(8).max(16),
  email: string().email(),
});

export let editUserSchema = object().shape({
  id: string().required(),
  name: string().optional().min(2).max(24),
  password: string().optional().min(8).max(16),
  email: string().optional().email(),
});

export let addCardSchema = object().shape({
  title: string().required(),
  description: string().required(),
  timeOfDay: string().optional().ensure(),
  dueDate: string().optional().ensure(),
  color: string().optional().ensure(),
});
export let editCardSchema = object().shape({
  id: string().required(),
  title: string(),
  description: string(),
  timeOfDay: string().optional().ensure(),
  dueDate: string().optional().ensure(),
  color: string()
    .optional()
    .ensure()
    .default(() => "#fff"),
  completed: bool()
    .optional()
    .default(() => false),
});

export type AddUserType = TypeOf<typeof addUserSchema>;
export type EditUserType = TypeOf<typeof editUserSchema>;

export type addCardType = TypeOf<typeof addCardSchema>;
export type editCardType = TypeOf<typeof editCardSchema>;
