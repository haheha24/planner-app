import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { ValidationError } from "yup";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

const validate = (
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await schema.validate(req.body).then(() => handler(req, res));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.status(500).send(error);
    }
  }
};

export default validate;
