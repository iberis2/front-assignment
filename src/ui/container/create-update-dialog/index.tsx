'use client';
import Button from '../../component/button';
import Dialog from '../../component/dialog';
import Flex from '../../component/flex';
import Text from '../../component/text';
import S from './styles.module.scss';
import { useCreateTodo, useUpdateTodo } from '@/src/remotes/todo/mutation';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import FormProvider from '../../component/hook-form/form-provider';

type FormType = { title: string; content: string };

interface Props {
  title: string;
  open: boolean;
  onOpen?: () => void;
  onConfirm?: SubmitHandler<FormType>;
  onClose: () => void;
}

export function CreateDialog(dialogProps: Props) {
  const { mutateAsync: createTodo } = useCreateTodo();
  const methods = useForm<FormType>();

  const handleCreateTodo: SubmitHandler<FormType> = async newTodo => {
    await createTodo(newTodo);
    dialogProps.onClose();
    methods.reset();
  };

  return <CreateUpdateDialogView methods={methods} onConfirm={handleCreateTodo} {...dialogProps} />;
}
export function UpdateDialog({ id, ...dialogProps }: Props & { id: string }) {
  const { mutateAsync: updateTodo } = useUpdateTodo(id);
  const methods = useForm<FormType>();

  const handleUpdateTodo: SubmitHandler<FormType> = async newTodo => {
    await updateTodo(newTodo);
    dialogProps.onClose();
    methods.reset();
  };

  return <CreateUpdateDialogView methods={methods} onConfirm={handleUpdateTodo} {...dialogProps} />;
}

function CreateUpdateDialogView({
  title,
  open,
  onClose,
  onConfirm,
  methods,
}: Props & { methods: UseFormReturn<FormType, any, undefined> }) {
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
          <Button size='m' type='submit'>
            확인
          </Button>
        </Dialog.Footer>
      </FormProvider>
    </Dialog>
  );
}
