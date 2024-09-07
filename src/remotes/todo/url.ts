import { GetTodoListResponse, GetTodoResponse } from './types';

export const getTodoList = async (): Promise<GetTodoListResponse | undefined> => {
  const response = await fetch('http://localhost:8080/todo_list');
  const data = await response.json();
  return data;
};

export const getTodo = async (id: number): Promise<GetTodoResponse | undefined> => {
  const response = await fetch(`http://localhost:8080/todo_list/${id}`);
  const data = await response.json();
  return data;
};
