import { ITodoCardSchema } from "../../../../../models/user";
import { rest } from "msw";

/* Get Card */
interface GetUserCardParam {
  id: string;
}
interface GetUserCardResponseBody {
  card: ITodoCardSchema;
}

const handleGetCard = rest.get<null, GetUserCardParam, GetUserCardResponseBody>(
  "/api/user/todo/get",
  (req, res, ctx) => {}
);

export default handleGetCard;
