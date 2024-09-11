import Link from 'next/link';

import { GetTodoListResponse } from '@/src/remotes/todo/types';

import Flex from '../../component/flex';
import Text from '../../component/text';
import S from './styles.module.scss';

type Props = {
  todoList: GetTodoListResponse;
};

export default function Home({ todoList = [] }: Props) {
  return (
    <Flex direction='column' gap={8}>
      <Link href='/todo-list' className={S.link}>
        <Text typo='h1' color='blue-500'>
          Go Todo List
        </Text>
      </Link>
      <div className={S['todo-list']}>
        {todoList.map(todo => (
          <div className={S.container} key={todo?.id}>
            <label className={S.label}>
              <input type='checkbox' checked={todo?.completed} />
              <Text typo='h3'>{todo?.title}</Text>
            </label>
            <div className={S.divider} />
            <div>
              <Text typo='b1'>{todo?.content}</Text>
            </div>
          </div>
        ))}
      </div>
    </Flex>
  );
}
