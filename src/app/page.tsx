"use client";

import { useState } from "react";

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Ajouter
  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos([{ id: crypto.randomUUID(), title: input.trim(), done: false }, ...todos]);
    setInput("");
  };

  // Supprimer
  const handleDelete = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Ouvrir édition
  const handleEditOpen = (todo: Todo) => {
    setEditId(todo.id);
    setEditValue(todo.title);
  };

  // Sauvegarder édition
  const handleEditSave = (id: string) => {
    if (!editValue.trim()) return;
    setTodos(todos.map((t) => (t.id === id ? { ...t, title: editValue.trim() } : t)));
    setEditId(null);
    setEditValue("");
  };

  // Cocher / décocher
  const handleToggle = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste de tâches</h1>

        {/* Ajout — pas de <form>, onClick + onKeyDown */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Nouvelle tâche..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium
                       px-4 py-2 rounded-lg transition"
          >
            Ajouter
          </button>
        </div>

        {/* Liste */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">
            Aucune tâche pour le moment.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3
                           flex items-center gap-3"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggle(todo.id)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer flex-shrink-0"
                />

                {/* Titre ou champ d'édition */}
                {editId === todo.id ? (
                  <input
                    autoFocus
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEditSave(todo.id)}
                    className="flex-1 border border-blue-400 rounded px-2 py-1 text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span
                    className={`flex-1 text-sm ${
                      todo.done ? "line-through text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {todo.title}
                  </span>
                )}

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {editId === todo.id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(todo.id)}
                        className="text-xs text-green-600 hover:text-green-800 font-medium"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="text-xs text-gray-400 hover:text-gray-600 font-medium"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditOpen(todo)}
                      className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Modifier
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-xs text-red-400 hover:text-red-600 font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
