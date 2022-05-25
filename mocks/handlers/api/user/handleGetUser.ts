import { IUser } from "../../../../models/user";
import { rest } from "msw";

/* Get User */
interface GetUserParam {
  id: string;
}
interface GetUserResponseBody {
  user: IUser;
}

const handleGetUser = rest.get<null, GetUserParam, GetUserResponseBody>(
  "/api/user/get",
  (req, res, ctx) => {}
);

export default handleGetUser;
