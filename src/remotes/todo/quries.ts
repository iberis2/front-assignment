import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../query-keys';
import { getTodo, getTodoList } from './url';

export const useGetTodoList = () => {
  return useQuery({ queryKey: QUERY_KEYS.todoList, queryFn: getTodoList });
};

export const useGetTodo = (id: number) => {
  return useQuery({ queryKey: QUERY_KEYS.todo, queryFn: () => getTodo(id), enabled: Boolean(id) });
};
