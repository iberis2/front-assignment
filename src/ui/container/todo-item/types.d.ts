export interface TodoItemViewProps {
  title?: string;
  content?: string;
  updateDialog: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  };
  confirmDialog: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  };
  deleteDialog: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  };
  handleOpenUpdateDialog: () => void;
  handleOpenDeleteDialog: () => void;
}
