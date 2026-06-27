import api from "../lib/api";

export const getProjects = () =>
  api("/projects");

export const createProject = (body) =>
  api("/projects", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateProject = (
  id,
  body
) =>
  api(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteProject = (id) =>
  api(`/projects/${id}`, {
    method: "DELETE",
  });