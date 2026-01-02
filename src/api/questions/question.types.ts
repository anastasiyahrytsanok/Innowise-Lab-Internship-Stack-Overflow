import type { Answer } from "../answers/answers.types";
import type { Links, Meta } from "../types/api";
import type { User } from "../users/users.types";

export type QuestionsResponse = {
  data: {
    data: Question[];
    meta: Meta;
    links: Links;
  };
};

export type Question = {
  id: string;
  title: string;
  description: string;
  attachedCode: string;
  answers: Answer[];
  user: User;
  isResolved: false;
};

export type CreateQuestionBody = {
  title: string;
  description: string;
  attachedCode: string;
};

export type EditQuestionVariables = {
  questionId: string;
  body: EditQuestionBody;
};

export type EditQuestionBody = {
  title: string;
  description: string;
  attachedCode: string;
};

export type QuestionResponse = {
  data: Question;
};
