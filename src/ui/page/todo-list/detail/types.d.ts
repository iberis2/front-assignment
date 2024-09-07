import { TodoResponse } from '@/src/remotes/todo/types';

export interface TodoDetailViewProps extends Partial<TodoResponse> {
  editMode?: boolean;
  deleteDialog: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onOpen: () => void;
    isLoading?: boolean;
  };
  handleUpdateTodo: (params: Partial<TodoResponse>) => Promise<void>;
}
