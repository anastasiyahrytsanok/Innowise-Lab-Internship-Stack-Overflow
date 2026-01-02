import { useInfiniteQuery } from "@tanstack/react-query"; // твой fetcher
import { getQuestions } from "./questions";
import { PAGE_SIZE } from "../../constants";

export function useQuestionsInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: ["questions"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getQuestions(pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage) => {
      const current = lastPage?.data.meta.currentPage;
      const total = lastPage?.data.meta.totalPages;

      if (typeof current !== "number" || typeof total !== "number")
        return undefined;
      return current < total ? current + 1 : undefined;
    },
  });
}
