
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function TodoPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Liste de tâches
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user.name}</span>
            <button
              onClick={logout}
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
              Déconnexion
            </button>
          </div>
        </div>

        {/* Champ ajout */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Nouvelle tâche..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            Ajouter
          </button>
        </div>

        {/* Liste statique */}
        <ul className="flex flex-col gap-2">
          
          <li className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-blue-600" />
            <span className="flex-1 text-sm text-gray-700">
              Faire les devoirs
            </span>
            <div className="flex gap-2">
              <button className="text-xs text-blue-500">Modifier</button>
              <button className="text-xs text-red-400">Supprimer</button>
            </div>
          </li>

          <li className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-blue-600" />
            <span className="flex-1 text-sm text-gray-400 line-through">
              Réviser React
            </span>
            <div className="flex gap-2">
              <button className="text-xs text-blue-500">Modifier</button>
              <button className="text-xs text-red-400">Supprimer</button>
            </div>
          </li>

        </ul>

      </div>
    </main>
  );
}