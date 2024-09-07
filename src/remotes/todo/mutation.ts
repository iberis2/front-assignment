import { useMutation } from '@tanstack/react-query';
import { deleteTodo, patchTodo, postTodo } from './url';

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: async (params: { title: string; content: string }) => postTodo(params),
  });
};

export const useUpdateTodo = (id: number) => {
  return useMutation({
    mutationFn: async (data: { title: string; content: string; completed: boolean }) =>
      patchTodo(id, data),
  });
};

export const useDeleteTodo = (id: number) => {
  return useMutation({
    mutationFn: async () => deleteTodo(id),
  });
};
