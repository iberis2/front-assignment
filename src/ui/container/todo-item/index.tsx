import { useBoolean } from '@/src/hooks/useBoolean';

import Button from '../../component/button';
import Flex from '../../component/flex';
import Text from '../../component/text';
import ConfirmDialog from '../confirm-dialog';
import CreateUpdateDialog from '../create-update-dialog';
import S from './styles.module.scss';
import { TodoItemViewProps } from './types';

interface Props {
  title?: string;
  content?: string;
}

export default function TodoItem(todoItemProps: Props) {
  const updateDialog = useBoolean(false);
  const deleteDialog = useBoolean(false);
  const confirmDialog = useBoolean(false);

  const handleUpdate = () => {
    updateDialog.onFalse();
  };

  const handleOpenCancelUpdateDialog = () => {
    updateDialog.onFalse();
    confirmDialog.onTrue();
  };

  const handleCloseCancelUpdateDialog = () => {
    confirmDialog.onFalse();
    updateDialog.onTrue();
  };

  const props = {
    ...todoItemProps,
    updateDialog: {
      open: updateDialog.value,
      onClose: handleOpenCancelUpdateDialog,
      onConfirm: handleUpdate,
    },
    confirmDialog: {
      open: confirmDialog.value,
      onClose: handleCloseCancelUpdateDialog,
      onConfirm: confirmDialog.onFalse,
    },
    deleteDialog: {
      open: deleteDialog.value,
      onClose: deleteDialog.onFalse,
      onConfirm: deleteDialog.onFalse,
    },
    handleOpenUpdateDialog: updateDialog.onTrue,
    handleOpenDeleteDialog: deleteDialog.onTrue,
  };

  return <TodoItemView {...props} />;
}

function TodoItemView({
  title,
  content,
  updateDialog,
  confirmDialog,
  deleteDialog,
  ...props
}: TodoItemViewProps) {
  return (
    <>
      <div className={S.container}>
        <Flex justify='space-between'>
          <label className={S.label}>
            <input type='checkbox' />
            <Text typo='h3'>{title}</Text>
          </label>
          <div>
            <Button onClick={props.handleOpenUpdateDialog} size='s' color='default'>
              수정하기
            </Button>
            <Button onClick={props.handleOpenDeleteDialog} size='s' color='error'>
              삭제하기
            </Button>
          </div>
        </Flex>
        <div className={S.divider} />
        <Text typo='b1'>{content}</Text>
      </div>
      <CreateUpdateDialog title='할일 수정' {...updateDialog} />
      <ConfirmDialog title='변경사항이 있습니다. 수정을 취소할까요?' {...confirmDialog} />
      <ConfirmDialog title='todo를 삭제하시겠습니까?' {...deleteDialog} />
    </>
  );
}
