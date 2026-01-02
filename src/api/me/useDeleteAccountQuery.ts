import { useQuery } from "@tanstack/react-query";
import { deleteAccount } from "./me";

export function useDeleteAccountQuery() {
  return useQuery({
    queryKey: ["deleteAccount"],
    queryFn: deleteAccount,
  });
}
