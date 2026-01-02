import { Box, Button, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Editor } from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import {
  CONFIRMATION_DIALOG_TEXT,
  PAGE_NAVIGATION,
  QUESTION_FORM_TEXT,
} from "../../constants";
import type { QuestionFormProps } from "./QuestionForm.types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema } from "../../validation/question.schema";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { useMutation } from "@tanstack/react-query";
import { createQuestion, editQuestion } from "../../api/questions/questions";

type FormValues = {
  title: string;
  description: string;
  attachedCode: string;
};

const QuestionForm = ({ isEditing, question }: QuestionFormProps) => {
  const navigate = useNavigate();

  const [pendingValues, setPendingValues] = useState<FormValues | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleCloseAskQuestionButtonClick = () => {
    navigate(PAGE_NAVIGATION.QUESTIONS);
  };

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: question?.title ?? "",
      description: question?.description ?? "",
      attachedCode: question?.attachedCode ?? "",
    },
    mode: "onChange",
  });

  const createQuestionMutation = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => navigate(PAGE_NAVIGATION.QUESTIONS),
  });

  const editQuestionMutation = useMutation({
    mutationFn: editQuestion,
    onSuccess: () => navigate(PAGE_NAVIGATION.QUESTIONS),
  });

  const onSubmit = (values: FormValues) => {
    setPendingValues(values);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingValues) return;

    if (isEditing && question) {
      editQuestionMutation.mutate({
        questionId: question?.id.toString(),
        body: {
          title: pendingValues.title,
          description: pendingValues.description,
          attachedCode: pendingValues.attachedCode,
        },
      });
    } else {
      createQuestionMutation.mutate({
        title: pendingValues.title,
        description: pendingValues.description,
        attachedCode: pendingValues.attachedCode,
      });
    }

    setIsConfirmOpen(false);
    setPendingValues(null);
  };

  const handleClose = () => {
    setIsConfirmOpen(false);
    setPendingValues(null);
  };

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        sx={{
          mb: "15px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onClick={handleCloseAskQuestionButtonClick}
      >
        <span>
          {isEditing
            ? QUESTION_FORM_TEXT.EXIT_BUTTON.EDIT
            : QUESTION_FORM_TEXT.EXIT_BUTTON.CREATE}
        </span>
        <CloseIcon />
      </Button>

      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={QUESTION_FORM_TEXT.LABEL.TITLE}
              fullWidth
              sx={{ mb: "20px" }}
              error={!!errors.title}
              helperText={errors.title?.message || " "}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={QUESTION_FORM_TEXT.LABEL.DESCRIPTION}
              fullWidth
              sx={{ mb: "40px" }}
              error={!!errors.description}
              helperText={errors.description?.message || " "}
            />
          )}
        />

        <Typography sx={{ opacity: "0.5" }}>
          {QUESTION_FORM_TEXT.LABEL.CODE}
        </Typography>

        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            overflow: "hidden",
            marginBottom: "25px",
          }}
        >
          <Controller
            name="attachedCode"
            control={control}
            render={({ field }) => (
              <Editor
                height="320px"
                language="js"
                theme="vs-light"
                value={field.value}
                onChange={(value) => field.onChange(value ?? "")}
                options={{
                  minimap: { enabled: false },
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            )}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={
            !isValid ||
            createQuestionMutation.isPending ||
            editQuestionMutation.isPending
          }
          onClick={() => setIsConfirmOpen(true)}
        >
          {isEditing
            ? QUESTION_FORM_TEXT.BUTTON.EDIT
            : QUESTION_FORM_TEXT.BUTTON.SAVE}
        </Button>
      </Box>

      <ConfirmationDialog
        title={
          isEditing
            ? CONFIRMATION_DIALOG_TEXT.EDIT_QUESTION.TITLE
            : CONFIRMATION_DIALOG_TEXT.CREATE_QUESTION.TITLE
        }
        question={
          isEditing
            ? CONFIRMATION_DIALOG_TEXT.EDIT_QUESTION.QUESTION
            : CONFIRMATION_DIALOG_TEXT.CREATE_QUESTION.QUESTION
        }
        open={isConfirmOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default QuestionForm;
