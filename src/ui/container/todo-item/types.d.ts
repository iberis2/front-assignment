import { TodoResponse } from '@/src/remotes/todo/types';

export interface TodoItemViewProps extends TodoResponse {
  updateDialog: {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
  };
  deleteDialog: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  };
  handleOpenUpdateDialog: () => void;
  handleOpenDeleteDialog: () => void;
}
