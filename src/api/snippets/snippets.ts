import type {
  CreateSnippetBody,
  EditSnippetVariables,
  LanguagesResponse,
  SnippetResponse,
  SnippetsResponse,
} from "./snippets.types";

export async function getSnippets(
  page = 1,
  limit = 10
): Promise<SnippetsResponse> {
  
  const res = await fetch(`/api/snippets?page=${page}&limit=${limit}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw json ?? { statusCode: res.status, message: await res.text() };
  }

  return json as SnippetsResponse;
}

export async function getSnippet(snippetId: string): Promise<SnippetResponse> {
  const res = await fetch(`/api/snippets/${snippetId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to load snippet");
  }

  return res.json();
}

export async function getLanguages(): Promise<LanguagesResponse> {
  const res = await fetch(`/api/snippets/languages`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to load languages");
  }

  return res.json();
}

export async function createSnippet(body: CreateSnippetBody) {
  const res = await fetch(`/api/snippets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to create snippet");
  }

  return res.json();
}

export async function editSnippet({ snippetId, body }: EditSnippetVariables) {
  const res = await fetch(`/api/snippets/${snippetId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to edit snippet");
  }

  return res.json();
}

export async function getUserSnippets(
  userId: string
): Promise<SnippetsResponse> {
  const res = await fetch(`/api/snippets?userId=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to load user snippets");
  }

  return res.json();
}

export async function deleteSnippet(snippetId: string) {
  const res = await fetch(`/api/snippets/${snippetId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to delete snippet");
  }

  return res.json();
}
