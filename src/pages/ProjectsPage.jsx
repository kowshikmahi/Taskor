import React, { useMemo, useState } from "react";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectsTable from "../components/projects/ProjectsTable";
import AddProjectModal from "../components/projects/AddProjectModal";

const initialProjects = [
  {
    id: 1,
    name: "BlueCart E-commerce Redesign",
    client: "BlueCart",
    status: "Active",
    priority: "High",
    dueDate: "2026-07-04",
    budget: "₹32,000",
    progress: 68,
  },
  {
    id: 2,
    name: "OptiCare Patient Dashboard",
    client: "OptiCare",
    status: "Planning",
    priority: "Medium",
    dueDate: "2026-07-10",
    budget: "₹24,000",
    progress: 20,
  },
  {
    id: 3,
    name: "Portfolio SEO Revamp",
    client: "Personal Brand",
    status: "Review",
    priority: "High",
    dueDate: "2026-06-29",
    budget: "₹12,000",
    progress: 90,
  },
  {
    id: 4,
    name: "Nova Interiors Landing Page",
    client: "Nova Interiors",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-06-18",
    budget: "₹8,000",
    progress: 100,
  },
];

const clientOptions = [
  "BlueCart",
  "OptiCare",
  "Personal Brand",
  "Nova Interiors",
  "GreenMint Studio",
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.client.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ? true : project.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, status]);

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "Active").length,
    planning: projects.filter((p) => p.status === "Planning").length,
    review: projects.filter((p) => p.status === "Review").length,
    completed: projects.filter((p) => p.status === "Completed").length,
  };

  function handleAddProject(newProject) {
    const project = {
      id: Date.now(),
      ...newProject,
      progress: 0,
    };

    setProjects((prev) => [project, ...prev]);
    setShowModal(false);
  }

  return (
    <div className="space-y-6">
      <ProjectsHeader stats={stats} onAddProject={() => setShowModal(true)} />

      <ProjectFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <ProjectsTable projects={filteredProjects} />

      <AddProjectModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProject}
        clientOptions={clientOptions}
      />
    </div>
  );
}