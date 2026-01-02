import type { MarkVariables } from "./marks.types";

export async function setMark({ snippetId, body }: MarkVariables) {
  const res = await fetch(`/api/snippets/${snippetId}/mark`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to set mark");
  }

  return res.json();
}
