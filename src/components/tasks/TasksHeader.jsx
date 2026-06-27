import React from "react";
import Button from "../ui/Button";
import { Plus } from "lucide-react";

export default function TasksHeader({
  onAddTask,
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-taskor-ink">

          Tasks

        </h1>

        <p className="text-slate-500 mt-2">

          Manage every task visually.

        </p>

      </div>

      <Button onClick={onAddTask}>

        <Plus size={18} />

        New Task

      </Button>

    </div>
  );
}
