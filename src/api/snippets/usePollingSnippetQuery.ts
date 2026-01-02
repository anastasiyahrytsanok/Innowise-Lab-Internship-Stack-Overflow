import { useQuery } from "@tanstack/react-query";
import { getSnippet } from "./snippets";

export function usePollingSnippetQuery(snippetId: string) {
  return useQuery({
    queryKey: ["snippet", snippetId],
    queryFn: () => getSnippet(snippetId!),
    enabled: !!snippetId,

    refetchInterval: 2000,
    refetchIntervalInBackground: true,

    staleTime: 0,

    placeholderData: (prev) => prev,
  });
}
