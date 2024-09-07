import { GetTodoListResponse } from '@/src/remotes/todo/types';
import Link from 'next/link';
import Text from '../../component/text';

type Props = {
  todoList: GetTodoListResponse;
};

export default function Home({ todoList }: Props) {
  return (
    <div>
      <Link href='/todo-list'>
        <Text typo='h1' color='blue-500'>
          Go Todo List
        </Text>
      </Link>
      <h1>Home</h1>
    </div>
  );
}
