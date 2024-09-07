import { GetTodoListResponse, TodoResponse } from './types';

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

export const getTodo = async (id: string): Promise<TodoResponse | undefined> => {
  if (!id) {
    throw new Error('id is required');
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

export const postTodo = async (params: {
  title: string;
  content: string;
}): Promise<TodoResponse | undefined> => {
  try {
    const response = await fetch(`http://localhost:8080/todo_list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...params, completed: false }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
export const patchTodo = async (
  id: string,
  data: { title?: string; content?: string; completed?: boolean },
): Promise<undefined> => {
  if (!id) {
    throw new Error('id is required');
  }
  try {
    const response = await fetch(`http://localhost:8080/todo_list/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const patchData = await response.json();
    return patchData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
export const deleteTodo = async (id: string): Promise<undefined> => {
  if (!id) {
    throw new Error('id is required');
  }
  try {
    const response = await fetch(`http://localhost:8080/todo_list/${id}`, { method: 'DELETE' });
    const deleteData = await response.json();
    return deleteData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
