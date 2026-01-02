import type { GetCommentsResponse } from "./comment.types";

export async function getComments(
  snippetId: string
): Promise<GetCommentsResponse> {
  const res = await fetch(`/api/comments?snippetId=${snippetId}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to load comments");
  return res.json();
}

export async function createComment(body: {
  snippetId: string;
  content: string;
}) {
  const res = await fetch("/api/comments", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to create comment");
  return res.json();
}

export async function deleteComment(commentId: string) {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to delete comment");
  }

  return res.json();
}
