import { apiRequest } from "../lib/api";

export async function getTasks() {
  return apiRequest("/tasks");
}

export async function createTask(taskData) {
  return apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export async function updateTask(taskId, taskData) {
  return apiRequest(`/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
}

export async function deleteTask(taskId) {
  return apiRequest(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}