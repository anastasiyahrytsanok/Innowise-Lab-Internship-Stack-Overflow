import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../constants";
import { getUsers } from "./users";

export function useUsersInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: ["users"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getUsers(pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage) => {
      const current = lastPage?.data.meta.currentPage;
      const total = lastPage?.data.meta.totalPages;

      if (typeof current !== "number" || typeof total !== "number")
        return undefined;
      return current < total ? current + 1 : undefined;
    },
  });
}
