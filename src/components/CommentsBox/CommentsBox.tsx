import {
  Alert,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  List,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommentsListItem from "../CommentsListItem/CommentsListItem";
import type { CommentsBoxProps } from "./CommentsBox.types";
import { createComment, deleteComment } from "../../api/comments/comment";
import Loader from "../Loader/Loader";
import { usePollingSnippetQuery } from "../../api/snippets/usePollingSnippetQuery";
import ClearIcon from "@mui/icons-material/Clear";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import {
  COMMENTS_BOX_TEXT,
  CONFIRMATION_DIALOG_TEXT,
  PAGE_NAVIGATION,
  QUESTION_PAGE_TEXT,
} from "../../constants";
import { useAuthStore } from "../../store/auth.store";
import { Navigate } from "react-router-dom";

const CommentsBox = ({ snippetId }: CommentsBoxProps) => {
  const userId = useAuthStore((s) => s.user?.id);

  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  const [commentForDeletion, setCommentForDeletion] = useState("");

  const [isSuccessCommentDeletionOpen, setIsSuccessCommentDeletionOpen] =
    useState(false);
  const [isDeleteCommentDialogOpen, setIsDeleteCommentDialogOpen] =
    useState(false);

  const { data, isLoading, isError } = usePollingSnippetQuery(snippetId);
  const comments = data?.data.comments ?? [];

  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      setText("");
      setIsAdding(false);
      await queryClient.invalidateQueries({
        queryKey: ["snippet", snippetId],
      });
    },
  });

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    createCommentMutation.mutate({ snippetId, content: trimmed });
  };

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      setIsSuccessCommentDeletionOpen(true);
    },
  });

  const handleDeleteCommentConfirmButton = () => {
    deleteCommentMutation.mutateAsync(commentForDeletion);
    setIsDeleteCommentDialogOpen(false);
    setCommentForDeletion("");
  };

  const handleDeleteButtonClick = (commentId: string) => {
    setCommentForDeletion(commentId);
    setIsDeleteCommentDialogOpen(true);
  };

  const handleConfirmDialogCloseButton = () => {
    setIsDeleteCommentDialogOpen(false);
    setCommentForDeletion("");
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return <Navigate to={PAGE_NAVIGATION.ERROR} replace />;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mt: "10px", textDecoration: "underline" }}>
        {COMMENTS_BOX_TEXT.TITLE}
      </Typography>

      <List>
        {comments.map((item) => (
          <Fragment key={item.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CommentsListItem comment={item} />
              {userId === item.user.id && (
                <Button onClick={() => handleDeleteButtonClick(item.id)}>
                  <ClearIcon />
                </Button>
              )}
            </Box>
            <Divider />
          </Fragment>
        ))}
      </List>

      {isAdding ? (
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
          <ClickAwayListener
            onClickAway={() => {
              setIsAdding(false);
              setText("");
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </ClickAwayListener>

          <Button
            variant="contained"
            sx={{ whiteSpace: "nowrap" }}
            onClick={handleAdd}
            disabled={createCommentMutation.isPending || !text.trim()}
          >
            {COMMENTS_BOX_TEXT.BUTTON.ADD_COMMENT}
          </Button>
        </Box>
      ) : (
        <Button onClick={() => setIsAdding(true)} sx={{ width: "max-content" }}>
          {COMMENTS_BOX_TEXT.BUTTON.ADD_COMMENT}
        </Button>
      )}

      <Snackbar
        open={isSuccessCommentDeletionOpen}
        autoHideDuration={2000}
        onClose={() => setIsSuccessCommentDeletionOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">
          {QUESTION_PAGE_TEXT.SUCCESSFUL_COMMENT_DELETION}
        </Alert>
      </Snackbar>

      <ConfirmationDialog
        title={CONFIRMATION_DIALOG_TEXT.DELETE_COMMENT.TITLE}
        question={CONFIRMATION_DIALOG_TEXT.DELETE_COMMENT.QUESTION}
        open={isDeleteCommentDialogOpen}
        onClose={handleConfirmDialogCloseButton}
        onConfirm={handleDeleteCommentConfirmButton}
      />
    </>
  );
};

export default CommentsBox;
