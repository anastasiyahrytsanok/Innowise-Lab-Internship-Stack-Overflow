import { useQuery } from "@tanstack/react-query";
import { getComments } from "./comment";

export function useComments(snippetId?: string) {
  return useQuery({
    queryKey: ["comments", snippetId],
    queryFn: () => getComments(snippetId!),
    enabled: !!snippetId,

    refetchInterval: 5000,
    refetchIntervalInBackground: true,

    staleTime: 0,

    placeholderData: (prev) => prev,
  });
}
