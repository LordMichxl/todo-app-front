"use client";
import { useState, useEffect } from "react";
import { Todo } from "@/types/todo";
import { fetchTodos, createTodo, deleteTodo } from "@/lib/api";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Au chargement de la page → récupère tous les todos depuis l'API
  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  // Ajouter un todo → appelle l'API puis met à jour l'affichage
  const add = async (title: string) => {
    const newTodo = await createTodo(title);
    setTodos((prev) => [...prev, newTodo]);
  };
  const modif = async (id: string, title: string) => {
    const updatedTodo = await createTodo(title);
    setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
  };


  // Supprimer un todo → appelle l'API puis retire de la liste
  const remove = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return { todos, add, modif, remove }; 
}