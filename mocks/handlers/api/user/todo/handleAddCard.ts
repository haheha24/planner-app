import { ITodoCardSchema } from "../../../../../models/user";
import { rest } from "msw";

/* Post User Card */
interface PostUserCardRequestBody {
  card: ITodoCardSchema;
}

interface PostUserCardResponseBody {
  added: true;
  card: ITodoCardSchema;
}

const handleAddCard = rest.post<
  PostUserCardRequestBody,
  { id: string },
  PostUserCardResponseBody
>("/api/user/todo/add", (req, res, ctx) => {});

export default handleAddCard;
