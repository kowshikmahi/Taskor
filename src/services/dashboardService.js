import {
  getClients,
} from "./clientsService";

import {
  getProjects,
} from "./projectsService";

import {
  getTasks,
} from "./tasksService";

export async function getDashboardData() {
  const [
    clients,
    projects,
    tasks,
  ] = await Promise.all([
    getClients(),
    getProjects(),
    getTasks(),
  ]);

  return {
    clients,
    projects,
    tasks,
  };
}