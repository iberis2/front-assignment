import Button from '../../component/button';
import Dialog from '../../component/dialog';
import Text from '../../component/text';
import S from './styles.module.scss';

interface Props {
  title: string;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export default function ConfirmDialog({ title, open, onConfirm, onClose, isLoading }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Content>
        <Text typo='h3' bold>
          {title}
        </Text>
      </Dialog.Content>
      <Dialog.Footer>
        <Button size='m' onClick={onClose} className={S.button}>
          취소
        </Button>
        <Button
          size='m'
          color='error'
          isLoading={isLoading}
          onClick={onConfirm}
          className={S.button}
        >
          확인
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
