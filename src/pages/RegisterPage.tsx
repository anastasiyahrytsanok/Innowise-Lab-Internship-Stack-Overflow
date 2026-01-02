import EnterForm from "../components/EnterForm/EnterForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { RegisterBody } from "../api/register/register.types";
import { registerRequest } from "../api/register/register";
import { PAGE_NAVIGATION, REGISTER_PAGE_TEXT } from "../constants";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);

  const registerMutation = useMutation({
    mutationFn: (data: RegisterBody) => registerRequest(data),
    onSuccess: () => {
      setIsSuccessSnackbarOpen(true);

      setTimeout(() => {
        navigate(PAGE_NAVIGATION.LOGIN, { replace: true });
      }, 1500);
    },
  });

  const onSubmit = async (body: RegisterBody): Promise<void> => {
    await registerMutation.mutateAsync(body);
  };

  return (
    <>
      <EnterForm isRegistration onSubmit={onSubmit} />

      <Snackbar
        open={isSuccessSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setIsSuccessSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">
         {REGISTER_PAGE_TEXT.SUCCESSFUL_REGISTRATION}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterPage;
