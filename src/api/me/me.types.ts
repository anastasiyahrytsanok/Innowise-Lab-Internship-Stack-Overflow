import type { User } from "../users/users.types";

export type getMeResponse = {
  data: User;
};

export type ChangeUserNameBody = {
  username: string;
};

export type ChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};
