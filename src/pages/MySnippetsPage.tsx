import { List, Typography } from "@mui/material";
import Snippet from "../components/Snippet/Snippet";
import { useAuthStore } from "../store/auth.store";
import { useUserSnippetsQuery } from "../api/snippets/useUserSnippetsQuery";
import { MY_SNIPPETS_PAGE_TEXT, PAGE_NAVIGATION } from "../constants";
import Loader from "../components/Loader/Loader";
import { Navigate } from "react-router-dom";

const MySnippetsPage = () => {
  const userId = useAuthStore((s) => s.user?.id);

  const { data, isLoading, isError } = useUserSnippetsQuery(userId);

  const userSnippets = data?.data.data;

  const isUserSnippetsExist = userSnippets && userSnippets?.length !== 0;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Navigate to={PAGE_NAVIGATION.ERROR} replace />;
  }

  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {isUserSnippetsExist ? (
        userSnippets.map((snippet) => (
          <Snippet
            key={snippet.id}
            height={320}
            data={snippet}
            userIsLogged={true}
            isEditableSnippet={true}
            queryKey={["userSnippets", userId]}
          />
        ))
      ) : (
        <Typography variant="h4" textAlign={"center"} sx={{ mt: "50px" }}>
          {MY_SNIPPETS_PAGE_TEXT.NO_SNIPPETS}
        </Typography>
      )}
    </List>
  );
};

export default MySnippetsPage;
