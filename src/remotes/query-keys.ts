export const QUERY_KEYS = {
  todo: ['todo'] as const,
  getTodo: (id: string) => [...QUERY_KEYS.todo, id] as const,
  todoList: ['todoList'] as const,
};
