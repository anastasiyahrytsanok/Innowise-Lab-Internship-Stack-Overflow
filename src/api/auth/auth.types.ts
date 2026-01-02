import type { User } from "../users/users.types";

export type LoginBody = {
  username: string;
  password: string;
};

export type LoginResponse = {
  data: User;
  message: string;
};

export type AuthResponse = {
  data: User;
};
