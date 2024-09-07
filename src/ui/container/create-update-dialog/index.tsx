import Button from '../../component/button';
import Dialog from '../../component/dialog';
import Flex from '../../component/flex';
import Text from '../../component/text';

interface Props {
  title: string;
  open: boolean;
  onOpen?: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function CreateUpdateDialog({
  title = '할 일 추가',
  open,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Title>
        <Text typo='h3' bold>
          {title}
        </Text>
      </Dialog.Title>
      <Dialog.Content>
        <Flex direction='column' gap={8}>
          <label htmlFor='title'>제목</label>
          <input id='title' />
          <label htmlFor='content'>내용</label>
          <textarea id='content' />
        </Flex>
      </Dialog.Content>
      <Dialog.Footer>
        <Button size='m' color='error' onClick={onClose}>
          취소
        </Button>
        <Button size='m' onClick={onConfirm}>
          확인
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
