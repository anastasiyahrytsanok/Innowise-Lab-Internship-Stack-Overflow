import { Box, Button, List, Typography } from "@mui/material";
import QuestionListItem from "../components/QuestionListItem/QuestionListItem";
import { PAGE_NAVIGATION, QUESTIONS_PAGE_TEXT } from "../constants";
import Loader from "../components/Loader/Loader";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuestionsInfiniteQuery } from "../api/questions/useQuestionsInfiniteQuery";
import { useEffect, useMemo, useRef } from "react";

const QuestionsPage = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQuestionsInfiniteQuery();

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const questions = useMemo(
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

  const isQuestionsExist = questions && questions?.length !== 0;

  const handleAskQuestionButtonClick = () => {
    navigate(`${PAGE_NAVIGATION.QUESTIONS}/create`);
  };

  const handleQuestionItemClick = (questionId: string) => {
    navigate(`${PAGE_NAVIGATION.QUESTIONS}/${questionId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Navigate to={PAGE_NAVIGATION.ERROR} replace />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <Button
          type="button"
          variant="contained"
          sx={{ width: "max-content" }}
          onClick={handleAskQuestionButtonClick}
        >
          {QUESTIONS_PAGE_TEXT.ASK_QUESTION_BUTTON}
        </Button>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          {isQuestionsExist ? (
            questions.map((question) => (
              <QuestionListItem
                question={question}
                onClick={handleQuestionItemClick}
              />
            ))
          ) : (
            <Typography variant="h4" textAlign={"center"} sx={{ mt: "50px" }}>
              {QUESTIONS_PAGE_TEXT.NO_QUESTIONS}
            </Typography>
          )}
        </List>
      </Box>

      <Box ref={sentinelRef} sx={{ height: 30 }} />
    </Box>
  );
};

export default QuestionsPage;
