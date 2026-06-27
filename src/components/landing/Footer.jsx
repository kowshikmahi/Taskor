import React from "react";
import { Link } from "react-router-dom";
import TaskorLogo from "../brand/TaskorLogo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-center sm:text-left">
      <div className="container-custom py-10 sm:py-14 lg:py-16">
        <div className="grid gap-10 text-center sm:text-left lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-12">
          <div className="flex flex-col items-center sm:items-start">
            <TaskorLogo size="lg" className="max-w-[150px]" />
            <p className="mt-5 max-w-sm text-slate-600 leading-8">
              Taskor is a modern workspace for managing clients, projects and tasks with simplicity, speed and elegance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Navigation</h3>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 sm:flex-col sm:items-start sm:justify-start sm:gap-4">
              <a href="#home" className="footer-link">Home</a>
              <a href="#features" className="footer-link">Features</a>
              <a href="#workflow" className="footer-link">Workflow</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#faq" className="footer-link">FAQ</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Account</h3>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 sm:flex-col sm:items-start sm:justify-start sm:gap-4">
              <Link to="/login" className="footer-link">Login</Link>
              <Link to="/signup" className="footer-link">Register</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-slate-200 pt-6 text-center sm:mt-14 md:flex-row md:justify-between md:text-left">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Taskor. All rights reserved.</p>
          <p className="text-sm text-slate-500">Designed & Developed by Kowshik Mahi</p>
        </div>
      </div>
    </footer>
  );
}

