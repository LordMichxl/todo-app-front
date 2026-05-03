"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
  };

  const register = async (email: string, name: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u: any) => u.email === email)) {
      throw new Error("Cet email est déjà utilisé");
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }
  return context;
}