import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-w-0">

          <Topbar />

          <main className="p-8">

            <Outlet />

          </main>

        </div>

      </div>

    </div>
  );
}
