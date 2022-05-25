import { ITodoCardSchema } from "../../../../../models/user";
import { rest } from "msw";

/* Delete User Card */
interface DeleteUserCardParam {
  id: string;
}
interface DeleteUserCardResponseBody {
  deleted: true;
  card: ITodoCardSchema;
}

const handleDeleteCard = rest.delete<
  null,
  DeleteUserCardParam,
  DeleteUserCardResponseBody
>("/api/user/todo/delete", (req, res, ctx) => {});

export default handleDeleteCard;
