//User and Todo API
import handleAddUser from "./api/user/handleAddUser";
import handleDeleteUser from "./api/user/handleDeleteUser";
import handleEditUser from "./api/user/handleEditUser";
import handleGetUser from "./api/user/handleGetUser";
import handleAddCard from "./api/user/todo/handleAddCard";
import handleDeleteCard from "./api/user/todo/handleDeleteCard";
import handleEditCard from "./api/user/todo/handleEditCard";
import handleGetCard from "./api/user/todo/handleGetCard";

//Setting cookie theme API
import handleSetTheme from "./api/theme/handleSetTheme";

export const handlers = [
  handleAddUser,
  handleDeleteUser,
  handleEditUser,
  handleGetUser,
  handleAddCard,
  handleDeleteCard,
  handleEditCard,
  handleGetCard,
  handleSetTheme,
];
