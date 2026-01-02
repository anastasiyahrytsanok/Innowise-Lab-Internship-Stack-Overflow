import type { Comment } from "../comments/comment.types";
import type { Mark } from "../marks/marks.types";
import type { Links, Meta } from "../types/api";

export type Snippet = {
  id: number;
  language: string;
  code: string;
  user: {
    id: number;
    username: string;
  };
  comments: Comment[];
  marks: Mark[];
};

export type SnippetsResponse = {
  data: {
    data: Snippet[];
    meta: {
      itemsPerPage: number;
      totalItems: number;
      currentPage: number;
      totalPages: number;
      sortBy: [string, "ASC" | "DESC"][];
      searchBy: string[];
      search: string;
      select: string[];
      filter: Record<string, unknown>;
    };
    links: {
      first: string;
      previous: string;
      current: string;
      next: string;
      last: string;
    };
  };
};

export type SnippetResponse = {
  data: Snippet;
  meta: Meta;
  links: Links;
};

export type LanguagesResponse = {
  data: string[];
};

export type CreateSnippetBody = {
  code: string;
  language: string;
};

export type EditSnippetBody = {
  code: string;
  language: string;
};

export type EditSnippetVariables = {
  snippetId: string;
  body: EditSnippetBody;
};
