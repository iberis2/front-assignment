import { getTodo } from '@/src/remotes/todo/url';
import TodoDetail from '@/src/ui/page/todo-list/detail';

type Props = {
  params: { id: string };
};

export default async function TodoDetailPage({ params }: Props) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return <TodoDetail todo={todo} id={params.id} />;
}
