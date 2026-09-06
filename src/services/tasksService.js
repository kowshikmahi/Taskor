import api from "../lib/api";

export const getTasks = () =>
  api("/api/tasks");

export const createTask = (body) =>
  api("/api/tasks", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateTask = (
  id,
  body
) =>
  api(`/api/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteTask = (id) =>
  api(`/api/tasks/${id}`, {
    method: "DELETE",
  });