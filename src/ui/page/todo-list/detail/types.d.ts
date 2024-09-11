import { UseFormReturn } from 'react-hook-form';

import { useBoolean } from '@/src/hooks/useBoolean';
import { TodoResponse } from '@/src/remotes/todo/types';

export interface TodoDetailViewProps extends Partial<TodoResponse> {
  editMode: ReturnType<typeof useBoolean>;
  deleteDialog: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onOpen: () => void;
    isLoading?: boolean;
  };
  handleUpdateTodo: (params: Partial<TodoResponse>) => Promise<void>;
  methods: UseFormReturn<
    {
      title: string;
      content: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}
