import { getTodoList } from '@/src/remotes/todo/url';
import TodoList from '@/src/ui/page/todo-list';

export default async function TodoListPage() {
  const todoList = await getTodoList();

  return <TodoList todoList={todoList ?? []} />;
}
