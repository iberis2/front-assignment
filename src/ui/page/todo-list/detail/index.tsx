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
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import FormProvider from '@/src/ui/component/hook-form/form-provider';
import { useEffect } from 'react';

type Props = {
  todo: TodoResponse;
  id: string;
};

export default function TodoDetail({ id }: Props) {
  const router = useRouter();
  const query = useQueryClient();
  const editMode = useBoolean(false);
  const deleteDialog = useBoolean(false);
  const { data: todo } = useGetTodo(id);
  const methods = useForm<{ title: string; content: string }>({
    defaultValues: { title: todo?.title, content: todo?.content },
  });

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
    editMode.onFalse();
  };

  useEffect(() => {
    methods.reset({ title: todo?.title, content: todo?.content });
  }, [todo]);

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
    editMode,
    methods,
  };

  return <TodoDetailView {...props} />;
}

// --------------------------------------------------------

function TodoDetailView({
  title,
  content,
  completed,
  deleteDialog,
  handleUpdateTodo,
  editMode,
  methods,
}: TodoDetailViewProps) {
  const confirmDialog = useBoolean(false);
  const disabledSave = methods.watch('title') === '' || methods.watch('content') === '';
  const handleUpdate = async () => {
    const [title, content] = methods.getValues(['title', 'content']);
    await handleUpdateTodo({ title, content });
  };

  const handleCancelUpdate = () => {
    const isDirty = methods.formState.isDirty;
    if (isDirty) {
      confirmDialog.onTrue();
      return;
    }
    editMode.onFalse();
  };

  return (
    <>
      <div className={S.container}>
        <FormProvider methods={methods}>
          <Flex justify='space-between' grow gap={8}>
            <label className={S.label}>
              <input
                type='checkbox'
                defaultChecked={completed}
                onChange={e => handleUpdateTodo({ completed: e.target.checked })}
              />
              <input
                readOnly={!editMode.value}
                className={S.input}
                {...methods.register('title')}
              />
            </label>
            <div>
              {!editMode.value ? (
                <div>
                  <Button
                    type='button'
                    onClick={editMode.onTrue}
                    size='s'
                    color='default'
                    className={S.button}
                  >
                    수정하기
                  </Button>
                  <Button
                    type='button'
                    onClick={deleteDialog.onOpen}
                    size='s'
                    color='error'
                    className={S.button}
                  >
                    삭제하기
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    type='button'
                    onClick={handleUpdate}
                    size='s'
                    color='info'
                    className={S.button}
                    disabled={disabledSave}
                  >
                    저장하기
                  </Button>
                  <Button
                    type='button'
                    onClick={handleCancelUpdate}
                    size='s'
                    color='error'
                    className={S.button}
                  >
                    취소하기
                  </Button>
                </div>
              )}
            </div>
          </Flex>
          <div className={S.divider} />
          <textarea
            className={S['text-area']}
            readOnly={!editMode.value}
            rows={10}
            {...methods.register('content')}
          />
        </FormProvider>
      </div>
      <ConfirmDialog title={`${title}를 삭제하시겠습니까?`} {...deleteDialog} />
      <ConfirmDialog
        title='변경사항이 있습니다. 수정을 취소할까요?'
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        onConfirm={() => {
          confirmDialog.onFalse();
          editMode.onFalse();
          methods.reset();
        }}
      />
    </>
  );
}
