import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <form className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-taskor-ink">
          Email address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-btn border border-taskor-mist bg-white px-4 py-3 text-taskor-ink outline-none transition focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-sm font-semibold text-taskor-ink">
            Password
          </label>
          <button
            type="button"
            className="text-sm font-medium text-taskor-purple hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-btn border border-taskor-mist bg-white px-4 py-3 text-taskor-ink outline-none transition focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-taskor-slate">
          <input type="checkbox" className="rounded border-taskor-mist" />
          Remember me
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-btn bg-taskor-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-card transition hover:scale-[1.01]"
      >
        Sign in to Taskor
      </button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-taskor-mist" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-taskor-slate">or continue with</span>
        </div>
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-btn border border-taskor-mist bg-white px-5 py-3 text-sm font-semibold text-taskor-ink transition hover:bg-taskor-cloud"
      >
        <span className="text-base">G</span>
        Continue with Google
      </button>
    </form>
  );
}