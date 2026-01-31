"use client";

import { useState, useEffect, useCallback } from "react";

const AUTH_KEY = "coachai_authenticated";
const VALID_USERNAME = "Mikeoh";
const VALID_PASSWORD = "TiTu3198";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(stored === "true");
    setIsLoading(false);
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
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
