import { useQuery } from "@tanstack/react-query";
import { authRequest } from "./auth";

export function useAuthQuery() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: authRequest,
  });
}
