import type { QueryKey } from "@tanstack/react-query";
import type { Snippet } from "../../api/snippets/snippets.types";

export interface SnippetProps {
  height: number;
  data: Snippet;
  userIsLogged: boolean;
  isEditableSnippet?: boolean;
  queryKey: QueryKey;
}
