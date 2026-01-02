import type {
  ChangePasswordBody,
  ChangeUserNameBody,
  getMeResponse,
} from "./me.types";

export async function deleteAccount() {
  const res = await fetch(`/api/me`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw data;
  }

  return data;
}

export async function changeUserName(body: ChangeUserNameBody) {
  const res = await fetch(`/api/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw data;
  }

  return data;
}

export async function getMe(): Promise<getMeResponse> {
  const res = await fetch(`/api/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to get me");
  }

  return res.json();
}

export async function changePassword(body: ChangePasswordBody) {
  const res = await fetch(`/api/me/password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);

    const error =
      typeof data === "object" && data !== null
        ? data
        : {
            statusCode: res.status,
            message: await res.text(),
          };

    throw error;
  }

  return res.json();
}
