export interface TodoItemProps {
  title?: string;
  content?: string;
  completed?: boolean;
}

export interface TodoItemViewProps extends TodoItemProps {
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
