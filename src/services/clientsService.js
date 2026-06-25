import { apiRequest } from "../lib/api";

export async function getClients() {
  return apiRequest("/clients");
}

export async function createClient(clientData) {
  return apiRequest("/clients", {
    method: "POST",
    body: JSON.stringify(clientData),
  });
}

export async function updateClient(clientId, clientData) {
  return apiRequest(`/clients/${clientId}`, {
    method: "PUT",
    body: JSON.stringify(clientData),
  });
}

export async function deleteClient(clientId) {
  return apiRequest(`/clients/${clientId}`, {
    method: "DELETE",
  });
}