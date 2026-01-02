import type { Question } from "../../api/questions/question.types";

export type QuestionListItemProps = {
  question: Question;
  onClick: (questionId: string) => void;
};
