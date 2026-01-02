import type { User } from "../users/users.types";

export type MarkType = "like" | "dislike" | "none";

export type Mark = {
  id: string;
  type: MarkType;
  user: User;
};

export type MarkVariables = {
  snippetId: string;
  body: {
    mark: MarkType;
  };
};
