export interface TodoResponse {
  id: string;
  title: string;
  content: string;
  completed: boolean;
}

export type GetTodoListResponse = TodoResponse[];
