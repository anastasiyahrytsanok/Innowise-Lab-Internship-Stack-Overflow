import { useQuery } from "@tanstack/react-query";
import { getUserSnippets } from "./snippets";

export function useUserSnippetsQuery(userId?: string) {
  return useQuery({
    queryKey: ["userSnippets", userId],
    queryFn: () => getUserSnippets(userId!),
    enabled: !!userId,
  });
}
