import { GetTodoListResponse, GetTodoResponse } from './types';

export const getTodoList = async (): Promise<GetTodoListResponse | undefined> => {
  try {
    const response = await fetch('http://localhost:8080/todo_list');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getTodo = async (id: number): Promise<GetTodoResponse | undefined> => {
  if (!id) {
    return undefined;
  }
  try {
    const response = await fetch(`http://localhost:8080/todo_list/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
