import api from "../lib/api";

export const login = ({ email, password }) =>
  api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const signup = (body) =>
  api("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const profile = () =>
  api("/api/auth/me");

// Aliases used by AuthContext
export const loginUser = login;
export const signupUser = signup;
export const getCurrentUser = profile;