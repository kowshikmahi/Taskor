import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TaskorLogo from "../components/brand/TaskorLogo";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/app";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-taskor-cloud px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-2xl">
        <div className="hidden w-1/2 flex-col justify-between bg-taskor-gradient p-10 text-white lg:flex">
          <div>
            <TaskorLogo variant="full-light" size="lg" className="max-w-[158px]" />
            <p className="mt-6 max-w-md text-sm leading-7 text-white/85">
              Welcome back to Taskor. Manage client work, projects, and tasks from one calm command center.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-medium text-white/80">Taskor Workflow</p>
            <h3 className="mt-3 text-2xl font-bold leading-tight">
              Stay on top of every client deliverable without the chaos.
            </h3>
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-8 sm:p-12 lg:w-1/2">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-8 inline-flex lg:hidden">
              <TaskorLogo size="lg" className="max-w-[150px]" />
            </Link>
            
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-taskor-purple">
                Welcome back
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-taskor-ink">
                Log in to Taskor
              </h1>
              <p className="mt-3 text-sm leading-7 text-taskor-slate">
                Continue where you left off and keep your workflow moving.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-taskor-ink">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-taskor-ink">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
                />
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="mt-6 text-sm text-taskor-slate">
              Don’t have an account?{" "}
              <Link to="/signup" className="font-semibold text-taskor-purple hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


