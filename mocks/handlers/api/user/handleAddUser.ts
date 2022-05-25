import { IUser } from "../../../../models/user";
import { rest } from "msw";

/* Post User */
interface PostUserRequestBody {
  user: IUser;
}

interface PostUserResponseBody {
  added: true;
  user: IUser;
}

const handleAddUser = rest.post<
  PostUserRequestBody,
  { id: string },
  PostUserResponseBody
>("/api/user/add", (req, res, ctx) => {});

export default handleAddUser