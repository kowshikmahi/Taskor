import React, { useState } from "react";

export default function AddClientModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    company: "",
    status: "Lead",
  });

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.contactPerson || !form.email || !form.company) {
      return;
    }

    onSubmit(form);

    setForm({
      name: "",
      contactPerson: "",
      email: "",
      company: "",
      status: "Lead",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-taskor-ink/50 px-4">
      <div className="w-full max-w-2xl rounded-[28px] bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-taskor-ink">Add New Client</h2>
            <p className="mt-2 text-sm text-taskor-slate">
              Create a client record with contact and business information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-taskor-slate hover:bg-taskor-cloud"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Client Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="BlueCart"
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Contact Person
            </label>
            <input
              name="contactPerson"
              value={form.contactPerson}
              onChange={handleChange}
              placeholder="Arjun Mehta"
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="client@example.com"
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Company
            </label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="BlueCart Pvt Ltd"
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            >
              <option value="Lead">Lead</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-btn border border-taskor-mist px-5 py-3 text-sm font-semibold text-taskor-slate hover:bg-taskor-cloud"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white shadow-card"
            >
              Save Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}