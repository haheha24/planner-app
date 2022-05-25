import { IUser } from "../../../../models/user";
import { rest } from "msw";

/* Delete User */
interface DeleteUserParam {
  id: string;
}
interface DeleteUserResponseBody {
  deleted: true;
  user: IUser;
}

const handleDeleteUser = rest.delete<
  null,
  DeleteUserParam,
  DeleteUserResponseBody
>("/api/user/delete", (req, res, ctx) => {});

export default handleDeleteUser;
