import { Search } from "lucide-react";
import React from "react";

export default function ClientFilters() {
  return (
    <div className="glass rounded-[28px] p-6 shadow-card">

      <div className="grid md:grid-cols-3 gap-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search client..."
            className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 outline-none focus:border-taskor-purple"
          />

        </div>

        <select className="h-12 rounded-2xl border border-slate-200 px-4">

          <option>All Clients</option>

          <option>Active</option>

          <option>Inactive</option>

        </select>

        <select className="h-12 rounded-2xl border border-slate-200 px-4">

          <option>Newest</option>

          <option>Oldest</option>

          <option>A-Z</option>

        </select>

      </div>

    </div>
  );
}