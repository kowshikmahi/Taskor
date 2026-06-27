import React from "react";
import Button from "../ui/Button";

export default function ProjectForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-[32px] p-8 w-full max-w-2xl">

        <h2 className="text-3xl font-bold">
          New Project
        </h2>

        <div className="grid gap-5 mt-8">

          <input
            className="input"
            placeholder="Project Name"
          />

          <select className="input">

            <option>Select Client</option>

          </select>

          <textarea
            className="input h-32 resize-none"
            placeholder="Description"
          />

          <input
            className="input"
            type="date"
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button>
            Create Project
          </Button>

        </div>

      </div>

    </div>
  );
}
