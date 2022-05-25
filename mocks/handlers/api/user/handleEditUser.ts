import { IUser } from "../../../../models/user";
import { rest } from "msw";

/* Patch User */
interface PatchUserRequestBody {
  user: Partial<IUser>;
}

interface PatchUserResponseBody {
  updated: true;
  user: IUser;
}

const handleEditUser = rest.patch<
  PatchUserRequestBody,
  { id: string },
  PatchUserResponseBody
>("/api/user/edit", (req, res, ctx) => {});

export default handleEditUser;
