import type { RegisterBody, RegisterResponse } from "./register.types";

export async function registerRequest(
  body: RegisterBody
): Promise<RegisterResponse> {
  const res = await fetch(`/api/register`, {
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
