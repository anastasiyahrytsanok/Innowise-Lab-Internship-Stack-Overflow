import type { UsersResponse, UserStatisticResponse } from "./users.types";

export async function getUserStatistic(
  userId: string
): Promise<UserStatisticResponse> {
  const res = await fetch(`/api/users/${userId}/statistic`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to load user statistic");
  }

  return res.json();
}

export async function getUsers(page = 1, limit = 10): Promise<UsersResponse> {
  const res = await fetch(`/api/users?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to load users");
  }

  return res.json();
}
