export type ConfirmationDialogProps = {
  title: string;
  question: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
