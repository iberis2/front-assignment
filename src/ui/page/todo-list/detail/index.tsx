'use client';

import { TodoResponse } from '@/src/remotes/todo/types';
import TodoItem from '@/src/ui/container/todo-item';

type Props = {
  todo: TodoResponse;
  id: string;
};

export default function TodoDetail({ todo, id }: Props) {
  return <TodoItem title={todo?.title} content={todo?.content} />;
}
