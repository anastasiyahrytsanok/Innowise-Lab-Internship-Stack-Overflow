import type { EnterFormProps, EnterFormValues } from "./EnterForm.types";
import {
  ENTER_FORM_TEXT,
  PAGE_NAVIGATION,
  VALIDATION_ERRORS,
} from "../../constants";
import {
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registrationSchema } from "../../validation/auth.schema";
import { useState } from "react";
import "./EnterForm.css";
import { getErrorMessage, getErrorStatus } from "../../utils";

const ENTER_FORM_FIELD = {
  USERNAME: "username",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
} as const;

export const EnterForm = ({ onSubmit, isRegistration }: EnterFormProps) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const linkText = isRegistration
    ? ENTER_FORM_TEXT.LINK.TO_LOGIN
    : ENTER_FORM_TEXT.LINK.TO_REGISTER;

  const buttonText = isRegistration
    ? ENTER_FORM_TEXT.BUTTON.REGISTER
    : ENTER_FORM_TEXT.BUTTON.LOGIN;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnterFormValues>({
    resolver: zodResolver(isRegistration ? registrationSchema : loginSchema),
    mode: "onSubmit",
  });

  const submit = async (values: EnterFormValues) => {
    try {
      await onSubmit({
        username: values.username,
        password: values.password,
      });
    } catch (error: unknown) {
      const status = getErrorStatus(error);

      if (!isRegistration && status === 401) {
        setError(ENTER_FORM_FIELD.PASSWORD, {
          type: "server",
          message: VALIDATION_ERRORS.WRONG_LOGIN_OR_PASSWORD,
        });
        return;
      }

      if (isRegistration && status === 409) {
        setError(ENTER_FORM_FIELD.USERNAME, {
          type: "server",
          message: getErrorMessage(error) ?? VALIDATION_ERRORS.USER_EXIST,
        });
        return;
      }

      setError("root", {
        type: "server",
        message: VALIDATION_ERRORS.ROOT,
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submit)}
      className="enter-form"
      sx={{ backgroundColor: "#ffffffff" }}
    >
      {isRegistration && (
        <Typography variant="h4" fontWeight="bold">
          {ENTER_FORM_TEXT.TITLE.REGISTRATION}
        </Typography>
      )}

      <TextField
        label={ENTER_FORM_TEXT.LABEL.USERNAME}
        error={!!errors.username}
        helperText={errors.username?.message}
        {...register(ENTER_FORM_FIELD.USERNAME)}
      />

      <TextField
        type={isPasswordShown ? "text" : "password"}
        label={ENTER_FORM_TEXT.LABEL.PASSWORD}
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register(ENTER_FORM_FIELD.PASSWORD)}
      />

      {isRegistration && (
        <TextField
          type={isPasswordShown ? "text" : "password"}
          label={ENTER_FORM_TEXT.LABEL.CONFIRM}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register(ENTER_FORM_FIELD.CONFIRM_PASSWORD)}
        />
      )}

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPasswordShown}
              onChange={() => setIsPasswordShown((prev) => !prev)}
            />
          }
          label={ENTER_FORM_TEXT.CHECKBOX_LABEL}
        />
      </FormGroup>

      {errors.root?.message && (
        <Typography color="error">{errors.root.message}</Typography>
      )}

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {buttonText}
      </Button>

      <Link
        to={
          isRegistration ? PAGE_NAVIGATION.LOGIN : PAGE_NAVIGATION.REGISTRATION
        }
        className="enter-form-link"
      >
        {linkText}
      </Link>
    </Box>
  );
};

export default EnterForm;
