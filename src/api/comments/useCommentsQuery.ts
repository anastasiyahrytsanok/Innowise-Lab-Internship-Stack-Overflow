import { useQuery } from "@tanstack/react-query";
import { getComments } from "./comment";

export function useGetCommentsQuery(snippetId: string) {
  return useQuery({
    queryKey: ["comments", snippetId],
    queryFn: () => getComments(snippetId!),
    enabled: !!snippetId,
  });
}
