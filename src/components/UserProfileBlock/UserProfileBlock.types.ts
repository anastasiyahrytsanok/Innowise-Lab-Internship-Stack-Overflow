import type { User, UserStatistic } from "../../api/users/users.types";

export interface UserProfileBlockProps {
  user: User;
  userStatistic: UserStatistic;
  isCurrentUser?: boolean;
}
