import type {
  CreateQuestionBody,
  EditQuestionVariables,
  QuestionResponse,
  QuestionsResponse,
} from "./question.types";

export async function getQuestions(
  page = 1,
  limit = 10
): Promise<QuestionsResponse> {
  const res = await fetch(`/api/questions?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to load questions");
  }

  return res.json();
}

export async function getQuestion(
  questionId: string
): Promise<QuestionResponse> {
  const res = await fetch(`/api/questions/${questionId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to load question");
  }

  return res.json();
}

export async function createQuestion(body: CreateQuestionBody) {
  const res = await fetch(`/api/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to create question");
  }

  return res.json();
}

export async function editQuestion({
  questionId,
  body,
}: EditQuestionVariables) {
  const res = await fetch(`/api/questions/${questionId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to edit question");
  }

  return res.json();
}

export async function deleteQuestion(questionId: string) {
  const res = await fetch(`/api/questions/${questionId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(async () => ({ message: await res.text() }));
    throw new Error(err.message || "Failed to delete question");
  }

  return res.json();
}
