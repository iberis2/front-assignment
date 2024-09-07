import { useBoolean } from '@/src/hooks/useBoolean';

import Button from '../../component/button';
import Flex from '../../component/flex';
import Text from '../../component/text';
import S from './styles.module.scss';

interface Props {
  title?: string;
  content?: string;
}

export default function TodoItem({ title, content }: Props) {
  const updateDialog = useBoolean(false);
  const deleteDialog = useBoolean(false);
  return (
    <div className={S.container}>
      <Flex justify='space-between'>
        <label className={S.label}>
          <input type='checkbox' />
          <Text typo='h3'>{title}</Text>
        </label>
        <div>
          <Button onClick={updateDialog.onTrue} size='s' color='default'>
            수정하기
          </Button>
          <Button onClick={deleteDialog.onTrue} size='s' color='error'>
            삭제하기
          </Button>
        </div>
      </Flex>
      <div className={S.divider} />
      <Text typo='b1'>{content}</Text>
    </div>
  );
}
