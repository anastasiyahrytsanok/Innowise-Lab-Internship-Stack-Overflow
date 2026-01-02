import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "./snippets";

export function useLanguagesQuery() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });
}
