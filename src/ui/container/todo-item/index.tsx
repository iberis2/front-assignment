'use client';
import { useBoolean } from '@/src/hooks/useBoolean';

import Button from '../../component/button';
import Flex from '../../component/flex';
import Text from '../../component/text';
import ConfirmDialog from '../confirm-dialog';
import { UpdateDialog } from '../create-update-dialog';
import S from './styles.module.scss';
import { TodoItemViewProps } from './types';
import { TodoResponse } from '@/src/remotes/todo/types';
import { useDeleteTodo } from '@/src/remotes/todo/mutation';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/src/remotes/query-keys';

export default function TodoItem(todoItemProps: TodoResponse) {
  const query = useQueryClient();
  const updateDialog = useBoolean(false);
  const deleteDialog = useBoolean(false);
  const { mutateAsync: deleteTodo, isPending } = useDeleteTodo(todoItemProps.id);

  const handleDeleteTodo = async () => {
    await deleteTodo();
    deleteDialog.onFalse();
    query.invalidateQueries({ queryKey: QUERY_KEYS.todoList });
  };

  const props = {
    ...todoItemProps,
    updateDialog: {
      open: updateDialog.value,
      onClose: updateDialog.onFalse,
      onOpen: updateDialog.onTrue,
    },
    deleteDialog: {
      open: deleteDialog.value,
      onClose: deleteDialog.onFalse,
      onConfirm: handleDeleteTodo,
      onOpen: deleteDialog.onTrue,
      isLoading: isPending,
    },
  };

  return <TodoItemView {...props} />;
}

function TodoItemView({
  id,
  title,
  content,
  completed,
  updateDialog,
  deleteDialog,
}: TodoItemViewProps) {
  return (
    <>
      <div className={S.container}>
        <Flex justify='space-between'>
          <label className={S.label}>
            <input type='checkbox' defaultChecked={completed} />
            <Text typo='h3'>{title}</Text>
          </label>
          <div>
            <Button onClick={updateDialog.onOpen} size='s' color='default'>
              수정하기
            </Button>
            <Button onClick={deleteDialog.onOpen} size='s' color='error'>
              삭제하기
            </Button>
          </div>
        </Flex>
        <div className={S.divider} />
        <Text typo='b1'>{content}</Text>
      </div>
      <UpdateDialog id={id} title='할일 수정' todo={{ title, content }} {...updateDialog} />
      <ConfirmDialog title={`${title}를 삭제하시겠습니까?`} {...deleteDialog} />
    </>
  );
}
