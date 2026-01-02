import {
  Alert,
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import defaultAvatar from "@/assets/avatar-default.png";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import type { UserProfileBlockProps } from "./UserProfileBlock.types";
import {
  CONFIRMATION_DIALOG_TEXT,
  MY_ACCOUNT_PAGE_TEXT,
  PAGE_NAVIGATION,
} from "../../constants";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { logoutRequest } from "../../api/auth/auth";
import { deleteAccount } from "../../api/me/me";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const UserProfileBlock = ({
  user,
  userStatistic,
  isCurrentUser,
}: UserProfileBlockProps) => {
  const statisticRows: Array<{ label: string; key: string; text: string }> = [
    { label: "Rating", key: "rating", text: String(userStatistic.rating) },
    {
      label: "Snippets",
      key: "snippets",
      text: String(userStatistic.snippetsCount),
    },
    {
      label: "Comments",
      key: "comments",
      text: String(userStatistic.commentsCount),
    },
    { label: "Likes", key: "likes", text: String(userStatistic.likesCount) },
    {
      label: "Dislikes",
      key: "dislikes",
      text: String(userStatistic.dislikesCount),
    },
    {
      label: "Questions",
      key: "questions",
      text: String(userStatistic.questionsCount),
    },
    {
      label: "Correct Answers",
      key: "correctAnswers",
      text: String(userStatistic.correctAnswersCount),
    },
    {
      label: "Regular Answers",
      key: "regularAnswers",
      text: String(userStatistic.regularAnswersCount),
    },
  ];

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSuccessDeletionSnackbarOpen, setIsSuccessDeletionSnackbarOpen] =
    useState(false);

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      logout();
      navigate(PAGE_NAVIGATION.LOGIN, { replace: true });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      setIsSuccessDeletionSnackbarOpen(true);

      setTimeout(() => {
        logout();
        navigate(PAGE_NAVIGATION.LOGIN, { replace: true });
      }, 1500);
    },
  });

  const handleLogoutButtonClick = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleDeleteAccountButtonClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleLogoutConfirmButton = () => {
    setIsLogoutDialogOpen(false);
    logoutMutation.mutate();
  };

  const handleDeleteConfirmButton = () => {
    setIsDeleteDialogOpen(false);
    deleteAccountMutation.mutate();
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #c1c8d7",
          borderRadius: "14px",
          padding: "40px",
          width: "95%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt="default"
            src={defaultAvatar}
            sx={{ width: "150px", height: "150px" }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {user.username}
              </Typography>
              <Typography fontStyle="italic">
                {MY_ACCOUNT_PAGE_TEXT.USER_DESCRIPTION.ID}: {user.id}
              </Typography>
              <Typography fontStyle="italic">
                {MY_ACCOUNT_PAGE_TEXT.USER_DESCRIPTION.ROLE}: {user.role}
              </Typography>
            </Box>

            {isCurrentUser && (
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogoutButtonClick}
                >
                  <LogoutIcon />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteAccountButtonClick}
                >
                  <DeleteForeverIcon />
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        <List>
          {statisticRows.map((item) => (
            <ListItem key={item.key} sx={{ margin: "0", padding: "0" }}>
              <Typography fontWeight="bold">{item.label + ":"}</Typography>
              <ListItemText
                primary={item.text}
                sx={{ margin: "0 0 0 5px", padding: "0" }}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>

      <Snackbar
        open={isSuccessDeletionSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setIsSuccessDeletionSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">
          {MY_ACCOUNT_PAGE_TEXT.SUCCESSFUL_ACCOUNT_DELETION}
        </Alert>
      </Snackbar>

      <ConfirmationDialog
        title={CONFIRMATION_DIALOG_TEXT.LOGOUT.TITLE}
        question={CONFIRMATION_DIALOG_TEXT.LOGOUT.QUESTION}
        open={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogoutConfirmButton}
      />

      <ConfirmationDialog
        title={CONFIRMATION_DIALOG_TEXT.DELETE.TITLE}
        question={CONFIRMATION_DIALOG_TEXT.DELETE.QUESTION}
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirmButton}
      />
    </>
  );
};

export default UserProfileBlock;
