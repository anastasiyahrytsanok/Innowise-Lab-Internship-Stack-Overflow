import { useParams } from "react-router-dom";
import SnippetForm from "../components/SnippetForm/SnippetForm";
import { useSnippetQuery } from "../api/snippets/useSnippetQuery";
import Loader from "../components/Loader/Loader";

const EditSnippetPage = () => {
  const { snippetId } = useParams<{ snippetId?: string }>();

  const { data, isLoading } = useSnippetQuery(snippetId);
  const snippet = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  if (!snippet) {
    return null;
  }

  return <SnippetForm isEditing snippet={snippet} />;
};

export default EditSnippetPage;
