import type { AuthResponse, LoginBody, LoginResponse } from "./auth.types";

export async function loginRequest(body: LoginBody): Promise<LoginResponse> {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw data;
  }

  return data;
}

export async function authRequest(): Promise<AuthResponse> {
  const res = await fetch(`/api/auth`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Unauthorized");
  }

  return res.json();
}

export async function logoutRequest() {
  await fetch(`/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
