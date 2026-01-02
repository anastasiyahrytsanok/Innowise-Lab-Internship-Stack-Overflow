import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "./questions";

export function useQuestionQuery(questionId: string | undefined) {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: () => getQuestion(questionId as string),
    enabled: Boolean(questionId),
  });
}
