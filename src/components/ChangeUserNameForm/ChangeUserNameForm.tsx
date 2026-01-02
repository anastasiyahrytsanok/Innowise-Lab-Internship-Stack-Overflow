import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  changeNameSchema,
  type ChangeNameFormValues,
} from "../../validation/editUser.schema";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CONFIRMATION_DIALOG_TEXT,
  MY_ACCOUNT_PAGE_TEXT,
  VALIDATION_ERRORS,
} from "../../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserName, getMe } from "../../api/me/me";
import type { getMeResponse } from "../../api/me/me.types";
import { useAuthStore } from "../../store/auth.store";
import { getErrorMessage, getErrorStatus } from "../../utils";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const ChangeUserNameForm = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const [isChangeNameDialogOpen, setIsChangeNameDialogOpen] = useState(false);
  const [isSuccessNameChangeSnackbarOpen, setIsSuccessNameChangeSnackbarOpen] =
    useState(false);
  const [pendingNameValues, setPendingNameValues] =
    useState<ChangeNameFormValues | null>(null);

  const {
    control,
    handleSubmit: handleSubmitName,
    formState: { errors: nameErrors, isValid: isNameValid },
    reset: resetName,
    setError: setNameError,
    clearErrors: clearNameErrors,
  } = useForm<ChangeNameFormValues>({
    resolver: zodResolver(changeNameSchema),
    mode: "onChange",
    defaultValues: { newUsername: "" },
  });

  const queryClient = useQueryClient();

  const changeUserNameMutation = useMutation({
    mutationFn: changeUserName,
    onSuccess: async () => {
      const freshMe = await queryClient.fetchQuery<getMeResponse>({
        queryKey: ["me"],
        queryFn: getMe,
      });

      setUser(freshMe.data);
    },
  });

  const onSubmitName = (values: ChangeNameFormValues) => {
    setPendingNameValues(values);
    setIsChangeNameDialogOpen(true);
  };

  const handleChangeNameConfirmButton = async () => {
    if (!pendingNameValues) return;

    try {
      await changeUserNameMutation.mutateAsync({
        username: pendingNameValues.newUsername,
      });

      resetName({ newUsername: "" });
      clearNameErrors();
      setPendingNameValues(null);
      setIsChangeNameDialogOpen(false);
      setIsSuccessNameChangeSnackbarOpen(true);
    } catch (error: unknown) {
      setIsChangeNameDialogOpen(false);

      const status = getErrorStatus(error);

      if (status === 409) {
        setNameError("newUsername", {
          type: "server",
          message: getErrorMessage(error) ?? VALIDATION_ERRORS.USER_EXIST,
        });
        return;
      }

      setNameError("root", {
        type: "server",
        message: VALIDATION_ERRORS.ROOT,
      });
    }
  };

  const newUsername = useWatch({ control, name: "newUsername" });

  const isButtonDisabled =
    !newUsername?.trim() ||
    !isNameValid ||
    isChangeNameDialogOpen ||
    changeUserNameMutation.isPending;

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmitName(onSubmitName)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        <Typography fontSize="bold">
          {MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.CHANGE_NAME}
        </Typography>
        <Controller
          name="newUsername"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              id="newUsername"
              variant="outlined"
              label={MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.LABEL.NEW_USERNAME}
              error={Boolean(nameErrors.newUsername)}
              helperText={nameErrors.newUsername?.message || " "}
              disabled={changeUserNameMutation.isPending}
            />
          )}
        />
        <Button
          type="submit"
          color="success"
          variant="contained"
          disabled={isButtonDisabled}
        >
          {MY_ACCOUNT_PAGE_TEXT.EDIT_FORM.BUTTON.SAVE}
        </Button>
      </Box>

      <ConfirmationDialog
        title={CONFIRMATION_DIALOG_TEXT.CHANGE_NAME.TITLE}
        question={CONFIRMATION_DIALOG_TEXT.CHANGE_NAME.QUESTION}
        open={isChangeNameDialogOpen}
        onClose={() => {
          setIsChangeNameDialogOpen(false);
          setPendingNameValues(null);
        }}
        onConfirm={handleChangeNameConfirmButton}
      />

      <Snackbar
        open={isSuccessNameChangeSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setIsSuccessNameChangeSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">
          {MY_ACCOUNT_PAGE_TEXT.SUCCESSFUL_NAME_CHANGE}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangeUserNameForm;
