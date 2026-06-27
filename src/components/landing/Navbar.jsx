import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Rocket } from "lucide-react";
import TaskorLogo from "../brand/TaskorLogo";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-3 py-1.5 sm:px-5 sm:py-2 lg:px-6">
        <div className="glass flex min-h-12 items-center justify-between gap-3 rounded-2xl px-3 py-1.5 sm:min-h-14 sm:px-5 sm:py-2 lg:px-6">

          {/* Logo */}

          <Link to="/" className="flex min-w-0 items-center">
            <TaskorLogo size="sm" className="max-w-[116px] sm:max-w-[132px]" />
          </Link>

          {/* Navigation */}

          <nav className="hidden items-center gap-5 text-sm xl:flex 2xl:gap-7">

            <a href="#home" className="nav-link">
              Home
            </a>

            <a href="#features" className="nav-link">
              Features
            </a>

            <a href="#workflow" className="nav-link">
              How It Works
            </a>

            <a href="#about" className="nav-link">
              About
            </a>

            <a href="#faq" className="nav-link">
              FAQ
            </a>

            <a href="#contact" className="nav-link">
              Contact
            </a>

          </nav>

          {/* Buttons */}

          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">

            <Link to="/login">
              <Button variant="secondary" size="sm" className="min-h-9 px-3 sm:min-h-10 sm:px-4">
                <LogIn size={16} />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>

            <Link to="/signup">
              <Button size="sm" className="min-h-9 px-3 sm:min-h-10 sm:px-4">
                <Rocket size={16} />
                <span className="hidden min-[420px]:inline">Get Started</span>
              </Button>
            </Link>

          </div>

        </div>
      </div>
    </motion.header>
  );
}

