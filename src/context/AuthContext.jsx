import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, signupUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function bootstrapAuth() {
      const token = localStorage.getItem("taskor_token");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("taskor_token");
        localStorage.removeItem("taskor_user");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    bootstrapAuth();
  }, []);

  async function signup(name, email, password) {
    const data = await signupUser({ name, email, password });

    localStorage.setItem("taskor_token", data.token);
    localStorage.setItem("taskor_user", JSON.stringify(data.user));
    setUser(data.user);

    return data.user;
  }

  async function login(email, password) {
    const data = await loginUser({ email, password });

    localStorage.setItem("taskor_token", data.token);
    localStorage.setItem("taskor_user", JSON.stringify(data.user));
    setUser(data.user);

    return data.user;
  }

  function logout() {
    localStorage.removeItem("taskor_token");
    localStorage.removeItem("taskor_user");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      authLoading,
      signup,
      login,
      logout,
    }),
    [user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}