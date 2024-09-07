export interface GetTodoResponse {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

export type GetTodoListResponse = GetTodoResponse[];
