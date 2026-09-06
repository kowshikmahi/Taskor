import api from "../lib/api";

export const getProjects = () =>
  api("/api/projects");

export const createProject = (body) =>
  api("/api/projects", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateProject = (
  id,
  body
) =>
  api(`/api/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteProject = (id) =>
  api(`/api/projects/${id}`, {
    method: "DELETE",
  });