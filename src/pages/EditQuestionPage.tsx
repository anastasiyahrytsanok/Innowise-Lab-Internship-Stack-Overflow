import { useParams } from "react-router-dom";
import QuestionForm from "../components/QuestionForm/QuestionForm";
import { useQuestionQuery } from "../api/questions/useQuestionQuery";
import Loader from "../components/Loader/Loader";

const EditQuestionPage = () => {
  const { questionId } = useParams<{ questionId?: string }>();

  const { data, isLoading } = useQuestionQuery(questionId);
  const question = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  if (!question) {
    return null;
  }

  return <QuestionForm isEditing question={question} />;
};

export default EditQuestionPage;
