import { useInfiniteQuery } from "@tanstack/react-query";
import { getSnippets } from "./snippets";
import { PAGE_SIZE } from "../../constants";

export function useSnippetsInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: ["snippets"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getSnippets(pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage) => {
      const current = lastPage?.data.meta?.currentPage;
      const total = lastPage?.data.meta?.totalPages;

      if (typeof current !== "number" || typeof total !== "number")
        return undefined;
      return current < total ? current + 1 : undefined;
    },
  });
}
