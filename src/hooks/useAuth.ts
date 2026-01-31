"use client";

import { useState, useEffect, useCallback } from "react";

const AUTH_KEY = "coachai_authenticated";

// Valid users
const VALID_USERS = [
  { username: "Mikeoh", password: "TiTu3198" },
  { username: "Guest", password: "Healthy2323" },
];

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(stored === "true");
    setIsLoading(false);
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    const isValid = VALID_USERS.some(
      (user) => user.username === username && user.password === password
    );
    if (isValid) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
