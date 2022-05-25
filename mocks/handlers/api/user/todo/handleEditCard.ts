import { ITodoCardSchema } from "../../../../../models/user";
import { rest } from "msw";

/* Patch User Card */
interface PatchUserCardRequestBody {
  card: ITodoCardSchema;
}

interface PatchUserCardResponseBody {
  updated: true;
  card: ITodoCardSchema;
}

const handleEditCard = rest.patch<
  PatchUserCardRequestBody,
  { id: string },
  PatchUserCardResponseBody
>("/api/user/todo/edit", (req, res, ctx) => {});

export default handleEditCard;
