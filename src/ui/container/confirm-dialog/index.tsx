import Button from '../../component/button';
import Dialog from '../../component/dialog';
import Text from '../../component/text';

interface Props {
  title: string;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({ title, open, onConfirm, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Content>
        <Text typo='h3' bold>
          {title}
        </Text>
      </Dialog.Content>
      <Dialog.Footer>
        <Button size='m' onClick={onClose}>
          취소
        </Button>
        <Button size='m' color='error' onClick={onConfirm}>
          확인
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
