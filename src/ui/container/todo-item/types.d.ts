import { TodoResponse } from '@/src/remotes/todo/types';

export interface TodoItemViewProps extends TodoResponse {
  updateDialog: {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    onOpen: () => void;
  };
  deleteDialog: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onOpen: () => void;
    isLoading?: boolean;
  };
  handleUpdateTodo: (completed: boolean) => Promise<void>;
}
