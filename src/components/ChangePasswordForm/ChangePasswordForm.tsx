import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  CONFIRMATION_DIALOG_TEXT,
  MY_ACCOUNT_PAGE_TEXT,
  VALIDATION_ERRORS,
} from "../../constants";
import { useState } from "react";
import type { ChangePasswordBody } from "../../api/me/me.types";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../../validation/editUser.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/me/me";
import { getErrorMessage, getErrorStatus } from "../../utils";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const ChangePasswordForm = () => {
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [
    isSuccessPasswordChangeSnackbarOpen,
    setIsSuccessPasswordChangeSnackbarOpen,
  ] = useState(false);
  const [pendingPasswordValues, setPendingPasswordValues] =
    useState<ChangePasswordFormValues | null>(null);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {
    control,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
    reset: resetPassword,
    setError: setPasswordError,
    clearErrors: clearPasswordErrors,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  const oldPassword = useWatch({ control, name: "oldPassword" });
  const newPassword = useWatch({ control, name: "newPassword" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
  });

  const onSubmitPassword = (values: ChangePasswordFormValues) => {
    setPendingPasswordValues(values);
    setIsChangePasswordDialogOpen(true);
  };

  const handleChangePasswordConfirmButton = async () => {
    if (!pendingPasswordValues) return;

    const body: ChangePasswordBody = {
      oldPassword: pendingPasswordValues.oldPassword,
      newPassword: pendingPasswordValues.newPassword,
    };

    try {
      await changePasswordMutation.mutateAsync(body);

      resetPassword({ oldPassword: "", newPassword: "", confirmPassword: "" });
      clearPasswordErrors();
      setPendingPasswordValues(null);
      setIsChangePasswordDialogOpen(false);
      setIsSuccessPasswordChangeSnackbarOpen(true);
    } catch (error: unknown) {
      const status = getErrorStatus(error);

      if (status === 400) {
        setIsChangePasswordDialogOpen(false);
        setPasswordError("oldPassword", {
          type: "server",
          message:
            getErrorMessage(error) ?? VALIDATION_ERRORS.WRONG_OLD_PASSWORD,
        });
        return;
      }

      setIsChangePasswordDialogOpen(false);
      setPasswordError("root", {
        type: "server",
        message: getErrorMessage(error) ?? VALIDATION_ERRORS.ROOT,
      });
    }
  };

  const handleConfirmationDialogClose = () => {
    setIsChangePasswordDialogOpen(false);
    setPendingPasswordValues(null);
  };

  const isAnyFieldEmpty =
    !oldPassword?.trim() || !newPassword?.trim() || !confirmPassword?.trim();

  const isButtonDisabled =
    isAnyFieldEmpty ||
    !isPasswordValid ||
    isChangePasswordDialogOpen ||
    changePasswordMutation.isPending;

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        <Typography fontSize="bold">
          {MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.CHANGE_PASSWORD}
        </Typography>

        <Controller
          name="oldPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={isPasswordShown ? "text" : "password"}
              id="oldPassword"
              variant="outlined"
              label={MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.LABEL.OLD_PASSWORD}
              error={Boolean(passwordErrors.oldPassword)}
              helperText={passwordErrors.oldPassword?.message || " "}
              disabled={changePasswordMutation.isPending}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={isPasswordShown ? "text" : "password"}
              id="newPassword"
              variant="outlined"
              label={MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.LABEL.NEW_PASSWORD}
              error={Boolean(passwordErrors.newPassword)}
              helperText={passwordErrors.newPassword?.message || " "}
              disabled={changePasswordMutation.isPending}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={isPasswordShown ? "text" : "password"}
              id="confirmPassword"
              variant="outlined"
              label={MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.LABEL.CONFIRM_PASSWORD}
              error={Boolean(passwordErrors.confirmPassword)}
              helperText={passwordErrors.confirmPassword?.message || " "}
              disabled={changePasswordMutation.isPending}
            />
          )}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPasswordShown}
                onChange={() => setIsPasswordShown((prev) => !prev)}
              />
            }
            label={MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.CHECKBOX_LABEL}
          />
        </FormGroup>

        {passwordErrors.root?.message && (
          <Typography color="error">{passwordErrors.root.message}</Typography>
        )}

        <Button
          type="submit"
          color="success"
          variant="contained"
          disabled={isButtonDisabled}
        >
          {MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.BUTTON.CHANGE_PASSWORD}
        </Button>
      </Box>

      <ConfirmationDialog
        title={CONFIRMATION_DIALOG_TEXT.CHANGE_PASSWORD.TITLE}
        question={CONFIRMATION_DIALOG_TEXT.CHANGE_PASSWORD.QUESTION}
        open={isChangePasswordDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleChangePasswordConfirmButton}
      />

      <Snackbar
        open={isSuccessPasswordChangeSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setIsSuccessPasswordChangeSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">
          {MY_ACCOUNT_PAGE_TEXT.SUCCESSFUL_NAME_PASSWORD}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangePasswordForm;
