'use client';

import { useBoolean } from '@/src/hooks/useBoolean';
import Button from '@/src/ui/component/button';
import Text from '@/src/ui/component/text';

import Flex from '../../component/flex';
import { CreateDialog } from '../../container/create-update-dialog';
import TodoItem from '../../container/todo-item';
import S from './styles.module.scss';
import { useGetTodoList } from '@/src/remotes/todo/quries';

export default function TodoList() {
  const { data: todoList } = useGetTodoList();
  const createDialog = useBoolean(false);

  return (
    <Flex direction='column' gap={8}>
      <Text typo='h1'>Todo List</Text>
      <Button onClick={createDialog.onTrue} color='info' size='s' className={S['button-create']}>
        추가하기
      </Button>
      <div className={S['todo-list']}>
        {todoList?.map(todo => <TodoItem key={todo?.id} {...todo} />)}
      </div>

      <CreateDialog open={createDialog.value} onClose={createDialog.onFalse} title='할일 추가' />
    </Flex>
  );
}
