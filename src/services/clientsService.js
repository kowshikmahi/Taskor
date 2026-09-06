import api from "../lib/api";

export const getClients = () =>
  api("/api/clients");

export const createClient = (body) =>
  api("/api/clients", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateClient = (
  id,
  body
) =>
  api(`/api/clients/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteClient = (id) =>
  api(`/api/clients/${id}`, {
    method: "DELETE",
  });