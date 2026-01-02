import type { Links, Meta } from "../types/api";

export type User = { id: string; username: string; role: string };

export type UserStatisticResponse = {
  data: User & {
    statistic: UserStatistic;
  };
};

export type UserStatistic = {
  snippetsCount: 0;
  rating: 0;
  commentsCount: 0;
  likesCount: 0;
  dislikesCount: 0;
  questionsCount: 0;
  correctAnswersCount: 0;
  regularAnswersCount: 0;
};

export type UsersResponse = {
  data: {
    data: User[];
    meta: Meta;
    links: Links;
  };
};
