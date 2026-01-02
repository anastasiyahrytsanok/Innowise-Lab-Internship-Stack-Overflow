import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuestionQuery } from "../api/questions/useQuestionQuery";
import Loader from "../components/Loader/Loader";
import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import { Editor } from "@monaco-editor/react";
import {
  CONFIRMATION_DIALOG_TEXT,
  PAGE_NAVIGATION,
  QUESTION_PAGE_TEXT,
  QUESTIONS_PAGE_TEXT,
} from "../constants";
import { useAuthStore } from "../store/auth.store";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";
import { deleteQuestion } from "../api/questions/questions";
import { useMutation } from "@tanstack/react-query";

const QuestionPage = () => {
  const { questionId } = useParams<{ questionId?: string }>();

  const userId = useAuthStore((s) => s.user?.id);

  const { data, isLoading, isError } = useQuestionQuery(questionId);
  const question = data?.data;

  const [isDeleteQuestionDialogOpen, setIsDeleteQuestionDialogOpen] =
    useState(false);
  const [isSuccessQuestionDeletionOpen, setIsSuccessQuestionDeletionOpen] =
    useState(false);

  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate(`${PAGE_NAVIGATION.QUESTIONS}/edit/${data?.data.id}`);
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteQuestionDialogOpen(true);
  };

  const deleteQuestionMutation = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      setIsSuccessQuestionDeletionOpen(true);
      navigate(PAGE_NAVIGATION.QUESTIONS);
    },
  });

  const handleDeleteQuestionConfirmButton = () => {
    console.log(data);
    deleteQuestionMutation.mutateAsync(data?.data.id.toString() ?? "");
    setIsDeleteQuestionDialogOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!question) {
    return null;
  }

  if (isError) {
    return <Navigate to={PAGE_NAVIGATION.ERROR} replace />;
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">{question.title}</Typography>
          {userId === question.user.id && (
            <Box>
              <Button>
                <EditIcon onClick={handleEditButtonClick} />
              </Button>
              <Button onClick={handleDeleteButtonClick}>
                <ClearIcon />
              </Button>
            </Box>
          )}
        </Box>
        <Typography>{question.description}</Typography>
        <Editor
          height="320px"
          theme="vs-light"
          value={question.attachedCode}
          options={{
            minimap: { enabled: false },
          }}
        />
        <Typography variant="h6" sx={{ textDecoration: "underline" }}>
          {QUESTION_PAGE_TEXT.ANSWER_TITLE}
        </Typography>
        <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {question.answers.map((answer) => (
            <ListItem
              key={answer.id}
              sx={{
                backgroundColor: answer.isCorrect
                  ? "rgba(26, 170, 0, 0.05)"
                  : "rgba(214, 6, 6, 0.05)",
                borderRadius: "14px",
              }}
            >
              <ListItemText>{answer.content}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>

      <Snackbar
        open={isSuccessQuestionDeletionOpen}
        autoHideDuration={2000}
        onClose={() => setIsSuccessQuestionDeletionOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">
          {QUESTIONS_PAGE_TEXT.SUCCESSFUL_QUESTION_DELETION}
        </Alert>
      </Snackbar>

      <ConfirmationDialog
        title={CONFIRMATION_DIALOG_TEXT.DELETE_QUESTION.TITLE}
        question={CONFIRMATION_DIALOG_TEXT.DELETE_QUESTION.QUESTION}
        open={isDeleteQuestionDialogOpen}
        onClose={() => {
          setIsDeleteQuestionDialogOpen(false);
        }}
        onConfirm={handleDeleteQuestionConfirmButton}
      />
    </>
  );
};

export default QuestionPage;
