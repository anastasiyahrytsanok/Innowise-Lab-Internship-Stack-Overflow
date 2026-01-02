import type { User } from "../users/users.types";

export type Comment = {
  id: string;
  content: string;
  user: User;
};

export type GetCommentsResponse = {
  data: Comment[];
};
