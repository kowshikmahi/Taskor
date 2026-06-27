import api from "../lib/api";

export const getTasks = () =>
  api("/tasks");

export const createTask = (body) =>
  api("/tasks", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateTask = (
  id,
  body
) =>
  api(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteTask = (id) =>
  api(`/tasks/${id}`, {
    method: "DELETE",
  });