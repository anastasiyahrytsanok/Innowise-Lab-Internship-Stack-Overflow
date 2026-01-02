import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import type { HeaderProps } from "./Header.types";
import MenuIcon from "@mui/icons-material/Menu";
import TranslateIcon from "@mui/icons-material/Translate";
import {
  CONFIRMATION_DIALOG_TEXT,
  HEADER_TEXT,
  PAGE_NAVIGATION,
} from "../../constants";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../api/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const Header = ({ userIsLogged, onMenuClick }: HeaderProps) => {
  const buttonText = userIsLogged
    ? HEADER_TEXT.BUTTON.SIGN_OUT
    : HEADER_TEXT.BUTTON.LOG_IN;

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      logout();
      navigate(PAGE_NAVIGATION.LOGIN, { replace: true });
    },
  });

  const handleButtonClick = () => {
    if (userIsLogged) {
      setIsLogoutDialogOpen(true);
    } else navigate(PAGE_NAVIGATION.LOGIN);
  };

  const handleLogoutConfirmButton = () => {
    setIsLogoutDialogOpen(false);
    logoutMutation.mutate();
  };

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            {userIsLogged && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
                onClick={onMenuClick}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h4" component="p" sx={{ mr: 1 }}>
              &lt;/&gt;
            </Typography>
            <Typography component="p" sx={{ flexGrow: 1 }}>
              {HEADER_TEXT.NAME}
            </Typography>
            <Button
              variant="outlined"
              sx={{ backgroundColor: "white" }}
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
            <TranslateIcon sx={{ ml: 2 }} />
            <Typography component="p">{HEADER_TEXT.LANGUAGE}</Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <ConfirmationDialog
        title={CONFIRMATION_DIALOG_TEXT.LOGOUT.TITLE}
        question={CONFIRMATION_DIALOG_TEXT.LOGOUT.QUESTION}
        open={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogoutConfirmButton}
      />
    </>
  );
};

export default Header;
