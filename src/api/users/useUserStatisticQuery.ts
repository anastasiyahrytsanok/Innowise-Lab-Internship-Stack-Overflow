import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getUserStatistic } from "./users";
import type { UserStatisticResponse } from "./users.types";

export const useUserStatisticQuery = (
  userId: string | undefined,
  options?: UseQueryOptions<UserStatisticResponse>
) => {
  return useQuery({
    queryKey: ["userStatistic", userId],
    queryFn: () => getUserStatistic(userId as string),
    enabled: Boolean(userId),
    ...options,
  });
};
