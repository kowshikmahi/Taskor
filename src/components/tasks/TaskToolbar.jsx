import React from "react";
import { Search } from "lucide-react";

export default function TaskToolbar() {
  return (
    <div className="glass rounded-[24px] p-5 shadow-card mb-8">

      <div className="grid md:grid-cols-3 gap-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search task..."
            className="input pl-11"
          />

        </div>

        <select className="input">

          <option>All Priorities</option>

          <option>High</option>

          <option>Medium</option>

          <option>Low</option>

        </select>

        <select className="input">

          <option>All Projects</option>

        </select>

      </div>

    </div>
  );
}
