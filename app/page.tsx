import { getTodoList } from '@/src/remotes/todo/url';
import Home from '@/src/ui/page/home';

export default async function HomePage() {
  const todoList = await getTodoList();

  return <Home todoList={todoList ?? []} />;
}
