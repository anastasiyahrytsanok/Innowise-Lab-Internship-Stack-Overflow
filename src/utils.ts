import type {
  InfiniteData,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query";

import type { User } from "./api/users/users.types";
import type { Mark } from "./api/marks/marks.types";
import type { SnippetsResponse } from "./api/snippets/snippets.types";

export type ServerError = {
  status?: number;
  statusCode?: number;
  response?: {
    status?: number;
  };
  message?: string;
};

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

export const getErrorStatus = (error: unknown): number | undefined => {
  if (!isRecord(error)) return;

  const status = error["status"];
  if (typeof status === "number") return status;

  const statusCode = error["statusCode"];
  if (typeof statusCode === "number") return statusCode;

  return;
};

export const getErrorMessage = (error: unknown): string | undefined => {
  if (!isRecord(error)) return;

  const message = error["message"];
  if (typeof message === "string") return message;

  return;
};

type SnippetsInfinite = InfiniteData<SnippetsResponse>;

function isInfiniteData<T>(v: unknown): v is InfiniteData<T> {
  if (!isRecord(v)) return false;
  return Array.isArray(v.pages) && Array.isArray(v.pageParams);
}

function updateMarksInSnippetsResponse(
  page: SnippetsResponse,
  snippetId: string,
  user: User,
  mark: Mark["type"]
): SnippetsResponse {
  const list = page?.data?.data;
  if (!Array.isArray(list)) return page;

  const nextList = list.map((snip) => {
    if (String(snip.id) !== snippetId) return snip;

    const marks = Array.isArray(snip.marks) ? snip.marks : [];
    const current = marks.find((m) => m.user.id === user.id)?.type ?? "none";
    const withoutMe = marks.filter((m) => m.user.id !== user.id);

    if (current === mark) return { ...snip, marks: withoutMe };

    const optimisticMark: Mark = {
      id: crypto.randomUUID(),
      type: mark,
      user,
    };

    return { ...snip, marks: [...withoutMe, optimisticMark] };
  });

  return { ...page, data: { ...page.data, data: nextList } };
}

export function optimisticUpdateMarksEverywhere(args: {
  queryClient: QueryClient;
  keys: readonly QueryKey[];
  snippetId: string;
  user: User;
  mark: Mark["type"];
}) {
  const { queryClient, keys, snippetId, user, mark } = args;

  keys.forEach((key) => {
    queryClient.setQueriesData({ queryKey: key }, (old) => {
      if (!old) return old;

      if (isInfiniteData<SnippetsResponse>(old)) {
        const inf = old as SnippetsInfinite;

        return {
          ...inf,
          pages: inf.pages.map((p) =>
            updateMarksInSnippetsResponse(p, snippetId, user, mark)
          ),
        };
      }

      return updateMarksInSnippetsResponse(
        old as SnippetsResponse,
        snippetId,
        user,
        mark
      );
    });
  });
}
