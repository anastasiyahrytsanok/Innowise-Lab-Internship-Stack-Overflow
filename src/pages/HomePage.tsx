import { Box, List, ListItem, Typography } from "@mui/material";
import Snippet from "../components/Snippet/Snippet";
import { HOME_PAGE_TEXT, PAGE_NAVIGATION } from "../constants";
import { useAuthStore } from "../store/auth.store";
import Loader from "../components/Loader/Loader";
import { Navigate } from "react-router-dom";
import { useSnippetsInfiniteQuery } from "../api/snippets/useSnippetsInfiniteQuery";
import { useEffect, useMemo, useRef } from "react";

const HomePage = () => {
  const user = useAuthStore((s) => s.user);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSnippetsInfiniteQuery();

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const snippets = useMemo(
    () => data?.pages.flatMap((p) => p.data.data) ?? [],
    [data]
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "600px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Navigate to={PAGE_NAVIGATION.ERROR} replace />;
  }

  return (
    <>
      <Typography variant="h4" textAlign="center" marginBottom="10px">
        {HOME_PAGE_TEXT.TITLE}
      </Typography>
      <Typography variant="h3" textAlign="center" marginBottom="30px">
        &lt;/&gt;
      </Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {snippets.map((snippet) => (
          <ListItem key={snippet.id} sx={{ width: "100%" }}>
            <Snippet
              height={320}
              data={snippet}
              userIsLogged={!!user}
              isEditableSnippet={user?.id === snippet.user.id.toString()}
              queryKey={["snippets"]}
            />
          </ListItem>
        ))}
      </List>

      <Box ref={sentinelRef} sx={{ height: 30 }} />
    </>
  );
};

export default HomePage;
