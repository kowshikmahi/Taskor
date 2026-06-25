import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskorLogo from "../components/brand/TaskorLogo";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
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

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setSubmitting(true);
      await signup(form.name, form.email, form.password);
      navigate("/app", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-taskor-cloud px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-2xl">
        <div className="hidden w-1/2 flex-col justify-between bg-taskor-gradient p-10 text-white lg:flex">
          <div>
            <TaskorLogo variant="full-light" className="h-10 w-auto" />
            <p className="mt-6 max-w-md text-sm leading-7 text-white/85">
              Create your Taskor workspace and organize client projects, deadlines, and task delivery in one place.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-medium text-white/80">Built for modern client work</p>
            <h3 className="mt-3 text-2xl font-bold leading-tight">
              One system for clients, projects, and delivery workflow.
            </h3>
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-8 sm:p-12 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-taskor-purple">
                Start your workspace
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-taskor-ink">
                Create your Taskor account
              </h1>
              <p className="mt-3 text-sm leading-7 text-taskor-slate">
                Set up your account and begin managing work from a single dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-taskor-ink">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Kowshik"
                  className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
                />
              </div>

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
                {submitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-sm text-taskor-slate">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-taskor-purple hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}