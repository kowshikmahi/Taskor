import React from "react";
import { Bell, Search } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">

      <div className="h-20 px-8 flex items-center justify-between">

        {/* Search */}

        <div className="relative w-full max-w-md">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search..."
            className="w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-5 py-3 outline-none focus:ring-2 focus:ring-taskor-blue"
          />

        </div>

        <div className="flex items-center gap-4">

          <ThemeToggle />

          <button className="relative w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50">

            <Bell size={20} />

            <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500"></span>

          </button>

          <div className="flex items-center gap-3">

            <img
              src="/founder.jpg"
              className="w-12 h-12 rounded-full object-cover"
              alt="Founder"
            />

            <div>

              <p className="font-semibold">
                Kowshik Mahi
              </p>

              <p className="text-sm text-taskor-slate">
                Founder
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}
