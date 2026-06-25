import React, { useMemo, useState } from "react";
import TasksHeader from "../components/tasks/TasksHeader";
import TaskToolbar from "../components/tasks/TaskToolbar";
import KanbanBoard from "../components/tasks/KanbanBoard";
import AddTaskModal from "../components/tasks/AddTaskModal";

const initialTasks = [
  {
    id: 1,
    title: "Collect homepage references",
    project: "BlueCart E-commerce Redesign",
    client: "BlueCart",
    status: "Todo",
    priority: "High",
    dueDate: "2026-07-01",
    assignee: "Kowshik",
    description: "Gather references and inspiration for hero layout, navigation, and conversion-focused sections.",
  },
  {
    id: 2,
    title: "Build pricing section UI",
    project: "BlueCart E-commerce Redesign",
    client: "BlueCart",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-07-03",
    assignee: "Kowshik",
    description: "Implement responsive pricing cards and CTA section.",
  },
  {
    id: 3,
    title: "Client feedback review",
    project: "OptiCare Patient Dashboard",
    client: "OptiCare",
    status: "Review",
    priority: "High",
    dueDate: "2026-06-29",
    assignee: "Kowshik",
    description: "Review dashboard changes based on feedback and prepare revision notes.",
  },
  {
    id: 4,
    title: "Finalize SEO metadata",
    project: "Portfolio SEO Revamp",
    client: "Personal Brand",
    status: "Done",
    priority: "Low",
    dueDate: "2026-06-25",
    assignee: "Kowshik",
    description: "Add page titles, meta descriptions, OG tags, and schema basics.",
  },
  {
    id: 5,
    title: "Set up onboarding form",
    project: "Nova Interiors Landing Page",
    client: "Nova Interiors",
    status: "Todo",
    priority: "Medium",
    dueDate: "2026-07-04",
    assignee: "Kowshik",
    description: "Prepare onboarding form to collect brand assets and content from the client.",
  },
  {
    id: 6,
    title: "Create dashboard chart cards",
    project: "OptiCare Patient Dashboard",
    client: "OptiCare",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-07-02",
    assignee: "Kowshik",
    description: "Build reusable chart/stat cards for the analytics section.",
  },
];

const projectOptions = [
  { name: "BlueCart E-commerce Redesign", client: "BlueCart" },
  { name: "OptiCare Patient Dashboard", client: "OptiCare" },
  { name: "Portfolio SEO Revamp", client: "Personal Brand" },
  { name: "Nova Interiors Landing Page", client: "Nova Interiors" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.project.toLowerCase().includes(search.toLowerCase()) ||
        task.client.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priority === "All" ? true : task.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, search, priority]);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "Todo").length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
    review: tasks.filter((task) => task.status === "Review").length,
    done: tasks.filter((task) => task.status === "Done").length,
  };

  function handleAddTask(newTask) {
    const task = {
      id: Date.now(),
      ...newTask,
    };

    setTasks((prev) => [task, ...prev]);
    setShowModal(false);
  }

  return (
    <div className="space-y-6">
      <TasksHeader stats={stats} onAddTask={() => setShowModal(true)} />

      <TaskToolbar
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
      />

      <KanbanBoard tasks={filteredTasks} />

      <AddTaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTask}
        projectOptions={projectOptions}
      />
    </div>
  );
}