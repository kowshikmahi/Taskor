import React from "react";
import Button from "../ui/Button";

export default function AddTaskModal({
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-[32px] p-8 w-full max-w-xl">

        <h2 className="text-3xl font-bold">

          Add Task

        </h2>

        <div className="space-y-5 mt-8">

          <input
            className="input"
            placeholder="Task Title"
          />

          <textarea
            className="input h-32 resize-none"
            placeholder="Description"
          />

          <select className="input">

            <option>Priority</option>

            <option>High</option>

            <option>Medium</option>

            <option>Low</option>

          </select>

          <select className="input">

            <option>Select Project</option>

          </select>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button>

            Create Task

          </Button>

        </div>

      </div>

    </div>
  );
}
