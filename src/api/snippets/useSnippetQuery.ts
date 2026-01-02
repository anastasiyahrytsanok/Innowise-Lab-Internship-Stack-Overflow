import { useQuery } from "@tanstack/react-query";
import { getSnippet } from "./snippets";

export function useSnippetQuery(snippetId: string | undefined) {
  return useQuery({
    queryKey: ["snippet", snippetId],
    queryFn: () => getSnippet(snippetId as string),
    enabled: Boolean(snippetId),
  });
}
