import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { ConfirmationDialogProps } from "./ConfirmationDialog.types";
import { CONFIRMATION_DIALOG_TEXT } from "../../constants";

const ConfirmationDialog = ({
  title,
  question,
  open,
  onClose,
  onConfirm,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{question}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} variant="contained" type="button">
          {CONFIRMATION_DIALOG_TEXT.CONFIRM_BUTTON}
        </Button>
        <Button onClick={onClose} type="button">
          {CONFIRMATION_DIALOG_TEXT.CANCEL_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
