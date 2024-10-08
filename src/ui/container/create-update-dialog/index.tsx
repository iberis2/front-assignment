'use client';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useBoolean } from '@/src/hooks/useBoolean';
import { QUERY_KEYS } from '@/src/remotes/query-keys';
import { useCreateTodo, useUpdateTodo } from '@/src/remotes/todo/mutation';

import Button from '../../component/button';
import Dialog from '../../component/dialog';
import Flex from '../../component/flex';
import FormProvider from '../../component/hook-form/form-provider';
import Text from '../../component/text';
import ConfirmDialog from '../confirm-dialog';
import S from './styles.module.scss';

type FormType = { title: string; content: string };

interface Props {
  title: string;
  todo?: { title?: string; content?: string };
  open: boolean;
  onOpen?: () => void;
  onConfirm?: SubmitHandler<FormType>;
  onClose: () => void;
}

export function CreateDialog(dialogProps: Props) {
  const query = useQueryClient();
  const { mutateAsync: createTodo, isPending } = useCreateTodo();
  const methods = useForm<FormType>();

  const handleCreateTodo: SubmitHandler<FormType> = async newTodo => {
    try {
      await createTodo(newTodo);
      query.invalidateQueries({ queryKey: QUERY_KEYS.todoList });
    } catch (e) {
      console.error(e);
      toast.error('생성에 실패했습니다.');
    }
    dialogProps.onClose();
    methods.reset();
  };

  return (
    <CreateUpdateDialogView
      methods={methods}
      onConfirm={handleCreateTodo}
      isLoading={isPending}
      {...dialogProps}
    />
  );
}
export function UpdateDialog({ id, todo, ...dialogProps }: Props & { id: string }) {
  const query = useQueryClient();
  const confirmDialog = useBoolean(false);
  const { mutateAsync: updateTodo, isPending } = useUpdateTodo(id);
  const methods = useForm<FormType>({
    defaultValues: { title: todo?.title, content: todo?.content },
  });

  const handleCloseUpdateDialog = () => {
    dialogProps.onClose();
    const isDirty = methods.formState.isDirty;
    if (isDirty) {
      confirmDialog.onTrue();
    } else {
      dialogProps.onClose();
    }
  };

  const handleCloseConfirmDialog = () => {
    confirmDialog.onFalse();
    dialogProps.onOpen?.();
  };

  const handleConfirmDialog = () => {
    confirmDialog.onFalse();
    methods.reset();
  };

  const handleUpdateTodo: SubmitHandler<FormType> = async newTodo => {
    try {
      await updateTodo(newTodo);
      query.invalidateQueries({ queryKey: QUERY_KEYS.todoList });
    } catch (e) {
      console.error(e);
      toast.error('수정에 실패했습니다.');
    }
    dialogProps.onClose();
  };

  return (
    <>
      <CreateUpdateDialogView
        methods={methods}
        onConfirm={handleUpdateTodo}
        {...dialogProps}
        onClose={handleCloseUpdateDialog}
        isLoading={isPending}
      />
      <ConfirmDialog
        title='변경사항이 있습니다. 수정을 취소할까요?'
        open={confirmDialog.value}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDialog}
      />
    </>
  );
}

function CreateUpdateDialogView({
  title,
  open,
  onClose,
  onConfirm,
  methods,
  isLoading,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: Props & { methods: UseFormReturn<FormType, any, undefined>; isLoading?: boolean }) {
  const disabledConfirm = methods.watch('title') === '' || methods.watch('content') === '';

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onConfirm}>
        <Dialog.Title>
          <Text typo='h3' bold>
            {title}
          </Text>
        </Dialog.Title>
        <Dialog.Content>
          <Flex direction='column' gap={8}>
            <input id='title' className={S.input} {...methods.register('title')} />
            <textarea id='content' className={S.input} {...methods.register('content')} />
          </Flex>
        </Dialog.Content>
        <Dialog.Footer>
          <Button size='m' color='error' type='button' onClick={onClose}>
            취소
          </Button>
          <Button size='m' type='submit' isLoading={isLoading} disabled={disabledConfirm}>
            확인
          </Button>
        </Dialog.Footer>
      </FormProvider>
    </Dialog>
  );
}
