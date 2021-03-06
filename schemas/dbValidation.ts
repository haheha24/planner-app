import { object, string, bool, TypeOf } from "yup";

export const registerSchema = object().shape({
  name: string()
    .min(2, "Must be a minimum of 2 characters")
    .max(32, "Must be less than 32 characters")
    .required("Please enter your name"),
  email: string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: string()
    .min(8, "Must be 8 characters or more")
    .max(16, "Must be 16 characters or less")
    .required("Please enter a password"),
});

export const signInSchema = object().shape({
  email: string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: string()
    .min(8, "Must be 8 characters or more")
    .max(16, "Must be 16 characters or less")
    .required("Please enter your password"),
});

export const editUserSchema = object().shape({
  id: string().required(),
  name: string().optional().min(2).max(24),
  password: string().optional().min(8).max(16),
  email: string().optional().email(),
});

export const addCardSchema = object().shape({
  title: string().required(),
  description: string().required(),
  timeOfDay: string().optional().ensure(),
  dueDate: string().optional().ensure(),
  color: string().optional().ensure(),
});
export const editCardSchema = object().shape({
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

export type AddUserType = TypeOf<typeof registerSchema>;
export type SignInSchema = TypeOf<typeof signInSchema>;
export type EditUserType = TypeOf<typeof editUserSchema>;
export type addCardType = TypeOf<typeof addCardSchema>;
export type editCardType = TypeOf<typeof editCardSchema>;
