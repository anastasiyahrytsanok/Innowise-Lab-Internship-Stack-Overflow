import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import Editor from "@monaco-editor/react";
import PersonIcon from "@mui/icons-material/Person";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import type { SnippetProps } from "./Snippet.types";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { deleteSnippet } from "../../api/snippets/snippets";
import { useState } from "react";
import {
  CONFIRMATION_DIALOG_TEXT,
  MY_SNIPPETS_PAGE_TEXT,
  PAGE_NAVIGATION,
} from "../../constants";
import { useAuthStore } from "../../store/auth.store";
import { setMark } from "../../api/marks/marks";
import type { SnippetsResponse } from "../../api/snippets/snippets.types";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { optimisticUpdateMarksEverywhere } from "../../utils";

const Snippet = ({
  height,
  data,
  userIsLogged,
  isEditableSnippet,
  queryKey,
}: SnippetProps) => {
  const [isSuccessSnippetDeletionOpen, setIsSuccessSnippetDeletionOpen] =
    useState(false);
  const [isDeleteSnippetDialogOpen, setIsDeleteSnippetDialogOpen] =
    useState(false);

  const user = useAuthStore((s) => s.user);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  let likes = 0;
  let dislikes = 0;

  data.marks.forEach((mark) => {
    if (mark.type === "like") {
      likes += 1;
    }
    if (mark.type === "dislike") {
      dislikes += 1;
    }
  });

  const userReaction = data.marks.find(
    (mark) => mark.user.id === user?.id
  )?.type;

  const handleCommentButtonClick = () => {
    navigate(`/posts/${data.id}`);
  };

  const deleteSnippetMutation = useMutation({
    mutationFn: deleteSnippet,
    onSuccess: () => {
      setIsSuccessSnippetDeletionOpen(true);
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const setMarkMutation = useMutation({
    mutationFn: setMark,

    onMutate: async (vars) => {
      const { snippetId, body } = vars;
      if (!user?.id) return;

      queryClient.cancelQueries({ queryKey });

      const prevSnippets =
        queryClient.getQueryData<InfiniteData<SnippetsResponse>>(queryKey);

      optimisticUpdateMarksEverywhere({
        queryClient,
        keys: [queryKey],
        snippetId,
        user,
        mark: body.mark,
      });

      return { prevSnippets };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prevSnippets)
        queryClient.setQueryData(queryKey, ctx.prevSnippets);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
        refetchType: "inactive",
      });
    },
  });

  const handleDeleteButtonClick = () => {
    setIsDeleteSnippetDialogOpen(true);
  };

  const handleDeleteSnippetConfirmButton = () => {
    deleteSnippetMutation.mutateAsync(data.id.toString());
    setIsDeleteSnippetDialogOpen(false);
  };

  const handleEditButtonClick = () => {
    navigate(`${PAGE_NAVIGATION.MY_SNIPPETS}/edit/${data.id}`);
  };

  const handleLikeButtonClick = () => {
    setMarkMutation.mutateAsync({
      snippetId: data.id.toString(),
      body: { mark: userReaction === "like" ? "none" : "like" },
    });
  };

  const handleDislikeButtonClick = () => {
    setMarkMutation.mutateAsync({
      snippetId: data.id.toString(),

      body: { mark: userReaction === "dislike" ? "none" : "dislike" },
    });
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #c1c8d7",
          borderRadius: "14px",
          width: "100%",
        }}
        key={data.id}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "15px",
              gap: "10px",
            }}
          >
            <PersonIcon />
            <Typography>{data.user.username}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "15px 15px 5px",
              gap: "10px",
            }}
          >
            {isEditableSnippet && (
              <>
                <Button>
                  <EditIcon onClick={handleEditButtonClick} />
                </Button>
                <Button onClick={handleDeleteButtonClick}>
                  <ClearIcon />
                </Button>
              </>
            )}

            <SubtitlesIcon />
            <Typography>{data.language}</Typography>
          </Box>
        </Box>
        <Editor
          height={`${height - 111}px`}
          language="javascript"
          theme="vs-light"
          value={data.code}
          options={{
            minimap: { enabled: false },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "9px 15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              disabled={!userIsLogged}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                opacity: userReaction === "like" ? 1 : 0.7,
                "&:hover": {
                  opacity: 1,
                },
              }}
              onClick={handleLikeButtonClick}
            >
              <Typography>{likes}</Typography>
              <ThumbUpIcon />
            </Button>
            <Button
              disabled={!userIsLogged}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                opacity: userReaction === "dislike" ? 1 : 0.7,
                "&:hover": {
                  opacity: 1,
                },
              }}
              onClick={handleDislikeButtonClick}
            >
              <Typography>{dislikes}</Typography>
              <ThumbDownIcon />
            </Button>
          </Box>
          <Button
            disabled={!userIsLogged}
            onClick={handleCommentButtonClick}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography>{data.comments.length}</Typography>
            <CommentIcon />
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={isSuccessSnippetDeletionOpen}
        autoHideDuration={2000}
        onClose={() => setIsSuccessSnippetDeletionOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">
          {MY_SNIPPETS_PAGE_TEXT.SUCCESSFUL_SNIPPET_DELETION}
        </Alert>
      </Snackbar>

      <ConfirmationDialog
        title={CONFIRMATION_DIALOG_TEXT.DELETE_SNIPPET.TITLE}
        question={CONFIRMATION_DIALOG_TEXT.DELETE_SNIPPET.QUESTION}
        open={isDeleteSnippetDialogOpen}
        onClose={() => {
          setIsDeleteSnippetDialogOpen(false);
        }}
        onConfirm={handleDeleteSnippetConfirmButton}
      />
    </>
  );
};

export default Snippet;
