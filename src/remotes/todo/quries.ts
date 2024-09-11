import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../query-keys';
import { TodoResponse } from './types';
import { getTodo, getTodoList } from './url';

export const useGetTodoList = () => {
  return useQuery({ queryKey: QUERY_KEYS.todoList, queryFn: getTodoList });
};

export const useGetTodo = (id: string, initialData?: TodoResponse) => {
  return useQuery({
    queryKey: QUERY_KEYS.getTodo(id),
    queryFn: () => getTodo(id),
    enabled: Boolean(id),
    initialData,
  });
};
