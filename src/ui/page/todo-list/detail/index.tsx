'use client';

import { TodoResponse } from '@/src/remotes/todo/types';
import Button from '@/src/ui/component/button';
import Flex from '@/src/ui/component/flex';
import { toast } from 'react-toastify';
import S from './styles.module.scss';
import ConfirmDialog from '@/src/ui/container/confirm-dialog';
import { TodoDetailViewProps } from './types';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTodo, useUpdateTodo } from '@/src/remotes/todo/mutation';
import { useGetTodo } from '@/src/remotes/todo/quries';
import { useBoolean } from '@/src/hooks/useBoolean';
import { QUERY_KEYS } from '@/src/remotes/query-keys';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

type Props = {
  todo: TodoResponse;
  id: string;
};

export default function TodoDetail({ todo: initialData, id }: Props) {
  const router = useRouter();
  const query = useQueryClient();
  const deleteDialog = useBoolean(false);
  const { data: todo } = useGetTodo(id);
  const { mutateAsync: deleteTodo, isPending } = useDeleteTodo(id);
  const { mutateAsync: updateTodo } = useUpdateTodo(id);

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo();
      query.invalidateQueries({ queryKey: QUERY_KEYS.todoList });
      router.push('/todo-list');
    } catch (e) {
      toast.error('삭제에 실패했습니다.');
    }
    deleteDialog.onFalse();
  };

  const handleUpdateTodo = async (params: Partial<TodoResponse>) => {
    try {
      await updateTodo(params);
      query.invalidateQueries({ queryKey: QUERY_KEYS.todoList });
      query.invalidateQueries({ queryKey: QUERY_KEYS.todo });
    } catch (e) {
      toast.error('변경에 실패했습니다.');
    }
  };

  const props = {
    ...todo,
    deleteDialog: {
      open: deleteDialog.value,
      onClose: deleteDialog.onFalse,
      onConfirm: handleDeleteTodo,
      onOpen: deleteDialog.onTrue,
      isLoading: isPending,
    },
    handleUpdateTodo,
  };

  return <TodoDetailView {...props} />;
}

function TodoDetailView({
  title,
  content,
  completed,
  deleteDialog,
  handleUpdateTodo,
}: TodoDetailViewProps) {
  const editMode = useBoolean(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onUpdateTodo = async () => {
    await handleUpdateTodo({
      title: titleRef.current?.value,
      content: contentRef.current?.value,
    });
    editMode.onFalse();
  };

  return (
    <>
      <div className={S.container}>
        <Flex justify='space-between' grow gap={8}>
          <label className={S.label}>
            <input
              type='checkbox'
              defaultChecked={completed}
              onChange={e => handleUpdateTodo({ completed: e.target.checked })}
            />
            <input
              defaultValue={title}
              ref={titleRef}
              readOnly={!editMode.value}
              className={S.input}
            />
          </label>
          <div>
            {!editMode.value ? (
              <Button onClick={editMode.onTrue} size='s' color='default' className={S.button}>
                수정하기
              </Button>
            ) : (
              <Button onClick={onUpdateTodo} size='s' color='info' className={S.button}>
                저장하기
              </Button>
            )}
            <Button onClick={deleteDialog.onOpen} size='s' color='error' className={S.button}>
              삭제하기
            </Button>
          </div>
        </Flex>
        <div className={S.divider} />
        <textarea
          ref={contentRef}
          defaultValue={content}
          className={S['text-area']}
          readOnly={!editMode.value}
          rows={10}
        />
      </div>
      <ConfirmDialog title={`${title}를 삭제하시겠습니까?`} {...deleteDialog} />
    </>
  );
}
