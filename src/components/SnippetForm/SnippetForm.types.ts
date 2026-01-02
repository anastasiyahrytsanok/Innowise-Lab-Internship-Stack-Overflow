import type { Snippet } from "../../api/snippets/snippets.types";

export type SnippetFormProps = {
  isEditing?: boolean;
  snippet?: Snippet;
};
