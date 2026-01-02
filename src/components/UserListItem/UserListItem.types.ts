import type { User } from "../../api/users/users.types";

export type UserListItemProps = {
  user: User;
  onClick: (userId: string) => void;
};
