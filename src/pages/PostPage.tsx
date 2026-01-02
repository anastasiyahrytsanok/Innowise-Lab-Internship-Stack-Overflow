import { Navigate, useParams } from "react-router-dom";
import Snippet from "../components/Snippet/Snippet";
import { useSnippetQuery } from "../api/snippets/useSnippetQuery";
import CommentsBox from "../components/CommentsBox/CommentsBox";
import { Box } from "@mui/material";
import Loader from "../components/Loader/Loader";
import { PAGE_NAVIGATION } from "../constants";

const PostPage = () => {
  const { postId } = useParams<{ postId?: string }>();

  const { data, isLoading, isError } = useSnippetQuery(postId);
  const snippet = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  if (!snippet) {
    return null;
  }

if (isError) {
    return <Navigate to={PAGE_NAVIGATION.ERROR} replace />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Snippet
        height={420}
        data={snippet}
        userIsLogged
        queryKey={["snippet", snippet.id]}
      />
      <CommentsBox snippetId={snippet.id.toString()} />
    </Box>
  );
};

export default PostPage;
