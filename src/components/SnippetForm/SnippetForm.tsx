import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import {
  CONFIRMATION_DIALOG_TEXT,
  SNIPPET_FORM_TEXT,
  PAGE_NAVIGATION,
} from "../../constants";
import { useLanguagesQuery } from "../../api/snippets/useLanguagesQuery";
import { useMutation } from "@tanstack/react-query";
import { createSnippet, editSnippet } from "../../api/snippets/snippets";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { snippetSchema } from "../../validation/snippet.schema";
import type { SnippetFormProps } from "./SnippetForm.types";

type FormValues = {
  language: string;
  code: string;
};

const SnippetForm = ({ isEditing, snippet }: SnippetFormProps) => {
  const languages = useLanguagesQuery();
  const navigate = useNavigate();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      language: snippet?.language ?? "JavaScript",
      code: snippet?.code ?? "",
    },
    mode: "onChange",
  });

  const createSnippetMutation = useMutation({
    mutationFn: createSnippet,
    onSuccess: () => navigate(PAGE_NAVIGATION.MY_SNIPPETS),
  });

  const editSnippetMutation = useMutation({
    mutationFn: editSnippet,
    onSuccess: () => navigate(PAGE_NAVIGATION.MY_SNIPPETS),
  });

  const title = isEditing
    ? SNIPPET_FORM_TEXT.TITLE.EDIT
    : SNIPPET_FORM_TEXT.TITLE.CREATE;

  const buttonText = isEditing
    ? SNIPPET_FORM_TEXT.BUTTON.EDIT
    : SNIPPET_FORM_TEXT.BUTTON.SAVE;

  const onSubmit = (values: FormValues) => {
    setPendingValues(values);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingValues) return;

    if (isEditing && snippet) {
      editSnippetMutation.mutate({
        snippetId: snippet?.id.toString(),
        body: { language: pendingValues.language, code: pendingValues.code },
      });
    } else {
      createSnippetMutation.mutate({
        language: pendingValues.language,
        code: pendingValues.code,
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
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ marginBottom: "30px" }}
        >
          {title}
        </Typography>
        <Typography fontWeight="bold" sx={{ marginBottom: "15px" }}>
          {SNIPPET_FORM_TEXT.SELECT_LANGUAGE_DESCRIPTION}
        </Typography>
        <FormControl fullWidth>
          <InputLabel>{SNIPPET_FORM_TEXT.SELECT_LANGUAGE_LABEL}</InputLabel>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="select-language-label"
                id="select-language"
                label="select"
                variant="filled"
                sx={{ marginBottom: "40px" }}
              >
                {(languages?.data?.data ?? []).map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <>
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
              <Typography sx={{ mt: 1 }} color="error">
                {errors.code?.message || " "}
              </Typography>
            </>
          )}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={!isValid || createSnippetMutation.isPending}
        >
          {buttonText}
        </Button>
      </Box>

      <ConfirmationDialog
        title={
          isEditing
            ? CONFIRMATION_DIALOG_TEXT.EDIT_SNIPPET.TITLE
            : CONFIRMATION_DIALOG_TEXT.CREATE_SNIPPET.TITLE
        }
        question={
          isEditing
            ? CONFIRMATION_DIALOG_TEXT.EDIT_SNIPPET.QUESTION
            : CONFIRMATION_DIALOG_TEXT.CREATE_SNIPPET.QUESTION
        }
        open={isConfirmOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default SnippetForm;
