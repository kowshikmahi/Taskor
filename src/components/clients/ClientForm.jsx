import Button from "../ui/Button";
import React from "react";

export default function ClientForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-[32px] w-full max-w-xl p-8">

        <h2 className="text-3xl font-bold">

          Add Client

        </h2>

        <div className="grid gap-5 mt-8">

          <input
            placeholder="Company Name"
            className="input"
          />

          <input
            placeholder="Email"
            className="input"
          />

          <input
            placeholder="Phone Number"
            className="input"
          />

          <textarea
            placeholder="Address"
            className="input h-32 resize-none"
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

            Save Client

          </Button>

        </div>

      </div>

    </div>
  );
}