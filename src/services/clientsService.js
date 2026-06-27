import api from "../lib/api";

export const getClients = () =>
  api("/clients");

export const createClient = (body) =>
  api("/clients", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateClient = (
  id,
  body
) =>
  api(`/clients/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteClient = (id) =>
  api(`/clients/${id}`, {
    method: "DELETE",
  });