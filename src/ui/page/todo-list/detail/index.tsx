'use client';

import { GetTodoResponse } from '@/src/remotes/todo/types';
import TodoItem from '@/src/ui/container/todo-item';

type Props = {
  todo: GetTodoResponse;
};

export default function TodoDetail({ todo }: Props) {
  return <TodoItem title={todo?.title} content={todo?.content} />;
}
