import type { User } from "../users/users.types";

export type RegisterBody = {
  username: string;
  password: string;
};

export type RegisterResponse = {
  data: User;
  message: string;
};