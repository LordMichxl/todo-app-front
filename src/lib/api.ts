import { Todo } from "@/types/todo";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export const fetchTodos = (): Promise<Todo[]> =>
  fetch(`${BASE}/api/todos`).then(r => r.json());

export const createTodo = (title: string):Promise<Todo> =>
  fetch(`${BASE}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then(r => r.json());

export const updateTodo = (id: string, title: string): Promise<Todo> =>
  fetch(`${BASE}/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then(r => r.json());

export const deleteTodo = (id: string): Promise<void> =>
  fetch(`${BASE}/api/todos/${id}`, { method: "DELETE" }).then(()=>{});