import { useQuery } from "@tanstack/react-query";
import { getMe } from "./me";

export function useGetMeQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
}
