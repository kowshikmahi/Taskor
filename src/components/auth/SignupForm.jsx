import React from "react";

export default function SignupForm() {
  return (
    <form className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-taskor-ink">
          Full name
        </label>
        <input
          type="text"
          placeholder="Your name"
          className="w-full rounded-btn border border-taskor-mist bg-white px-4 py-3 text-taskor-ink outline-none transition focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
        />
      </div>

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
        <label className="mb-2 block text-sm font-semibold text-taskor-ink">
          Password
        </label>
        <input
          type="password"
          placeholder="Create a password"
          className="w-full rounded-btn border border-taskor-mist bg-white px-4 py-3 text-taskor-ink outline-none transition focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-taskor-ink">
          Confirm password
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          className="w-full rounded-btn border border-taskor-mist bg-white px-4 py-3 text-taskor-ink outline-none transition focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-btn bg-taskor-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-card transition hover:scale-[1.01]"
      >
        Create your Taskor account
      </button>

      <p className="text-center text-xs leading-6 text-taskor-slate">
        By creating an account, you agree to Taskor’s Terms and Privacy Policy.
      </p>
    </form>
  );
}