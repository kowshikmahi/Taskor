import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("taskor_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function login(email) {
    const fakeUser = {
      id: Date.now(),
      name: email.split("@")[0],
      email,
    };

    localStorage.setItem("taskor_user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  }

  function signup(name, email) {
    const fakeUser = {
      id: Date.now(),
      name,
      email,
    };

    localStorage.setItem("taskor_user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  }

  function logout() {
    localStorage.removeItem("taskor_user");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
    }),
    [user]
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