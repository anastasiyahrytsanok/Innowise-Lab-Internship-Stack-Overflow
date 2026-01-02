import {
  Alert,
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import defaultAvatar from "@/assets/avatar-default.png";
import type { QuestionListItemProps } from "./QuestionListItem.types";
import {
  CONFIRMATION_DIALOG_TEXT,
  PAGE_NAVIGATION,
  QUESTIONS_PAGE_TEXT,
} from "../../constants";
import { useAuthStore } from "../../store/auth.store";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion } from "../../api/questions/questions";

const QuestionListItem = ({ question, onClick }: QuestionListItemProps) => {
  const userId = useAuthStore((s) => s.user?.id);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [isDeleteQuestionDialogOpen, setIsDeleteQuestionDialogOpen] =
    useState(false);
  const [isSuccessQuestionDeletionOpen, setIsSuccessQuestionDeletionOpen] =
    useState(false);

  const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`${PAGE_NAVIGATION.QUESTIONS}/edit/${question.id}`);
  };

  const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDeleteQuestionDialogOpen(true);
  };

  const deleteQuestionMutation = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      setIsSuccessQuestionDeletionOpen(true);
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  const handleDeleteQuestionConfirmButton = async () => {
    await deleteQuestionMutation.mutateAsync(question.id.toString() ?? "");
    setIsDeleteQuestionDialogOpen(false);
  };

  return (
    <>
      <ListItem>
        <ListItemButton
          onClick={() => onClick(question.id)}
          sx={{
            border: "1px solid #c1c8d7",
            borderRadius: "14px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="default"
                src={defaultAvatar}
                sx={{ marginRight: "15px" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5" fontSize="bold">
                  {question.title}
                </Typography>
                <Typography fontSize={12} sx={{ opacity: "0.5" }}>
                  {QUESTIONS_PAGE_TEXT.NAME_LABEL}
                  <span>{question.user.username}</span>
                </Typography>
              </Box>
            </Box>

            {userId === question.user.id && (
              <Box sx={{ alignSelf: "end" }}>
                <Button onClick={handleEditButtonClick}>
                  <EditIcon />
                </Button>
                <Button onClick={handleDeleteButtonClick}>
                  <ClearIcon />
                </Button>
              </Box>
            )}
          </Box>
          <ListItemText
            primary={question.description}
            sx={{ opacity: "0.8" }}
          />
        </ListItemButton>
      </ListItem>

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

export default QuestionListItem;
