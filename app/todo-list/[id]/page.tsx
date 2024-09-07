import { getTodo } from '@/src/remotes/todo/url';
import TodoDetail from '@/src/ui/page/todo-list/detail';
import React from 'react';

type Props = {
  params: { id: string };
};

export default async function TodoDetailPage({ params }: Props) {
  const todo = await getTodo(Number(params.id));

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return <TodoDetail todo={todo} />;
}
