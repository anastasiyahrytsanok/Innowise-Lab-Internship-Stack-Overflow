import type { Question } from "../../api/questions/question.types";

export type QuestionFormProps = {
  isEditing?: boolean;
  question?: Question;
};
