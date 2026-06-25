import React, { useEffect, useMemo, useState } from "react";
import { createClient, deleteClient, getClients, updateClient } from "../services/clientsService";

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  status: "Active",
  notes: "",
};

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      setError("");
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setError(err.message || "Failed to load clients");
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingClient(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  }

  function openEditModal(client) {
    setEditingClient(client);
    setForm({
      name: client.name || "",
      company: client.company || "",
      email: client.email || "",
      phone: client.phone || "",
      status: client.status || "Active",
      notes: client.notes || "",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingClient(null);
    setForm(emptyForm);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Client name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingClient) {
        const updated = await updateClient(editingClient._id, form);
        setClients((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      } else {
        const created = await createClient(form);
        setClients((prev) => [created, ...prev]);
      }

      closeModal();
    } catch (err) {
      setError(err.message || "Failed to save client");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Delete this client?");
    if (!ok) return;

    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete client");
    }
  }

  const activeCount = useMemo(
    () => clients.filter((client) => client.status === "Active").length,
    [clients]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-taskor-purple">
            Client workspace
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-taskor-ink">Clients</h1>
          <p className="mt-2 text-sm text-taskor-slate">
            Manage your client relationships, contact details, and account status.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white shadow-card"
        >
          + Add Client
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-card">
          <p className="text-sm text-taskor-slate">Total Clients</p>
          <p className="mt-3 text-3xl font-bold text-taskor-ink">{clients.length}</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-card">
          <p className="text-sm text-taskor-slate">Active Clients</p>
          <p className="mt-3 text-3xl font-bold text-taskor-ink">{activeCount}</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-card">
          <p className="text-sm text-taskor-slate">Leads / Inactive</p>
          <p className="mt-3 text-3xl font-bold text-taskor-ink">{clients.length - activeCount}</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card">
        {loading ? (
          <p className="text-sm text-taskor-slate">Loading clients...</p>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : clients.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-taskor-mist p-8 text-center">
            <h3 className="text-lg font-semibold text-taskor-ink">No clients yet</h3>
            <p className="mt-2 text-sm text-taskor-slate">
              Add your first client to start managing projects and tasks.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-taskor-mist text-sm text-taskor-slate">
                  <th className="px-4 py-3 font-semibold">Client</th>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id} className="border-b border-taskor-cloud/70">
                    <td className="px-4 py-4 font-semibold text-taskor-ink">{client.name}</td>
                    <td className="px-4 py-4 text-taskor-slate">{client.company || "—"}</td>
                    <td className="px-4 py-4 text-taskor-slate">{client.email || "—"}</td>
                    <td className="px-4 py-4 text-taskor-slate">{client.phone || "—"}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-taskor-cloud px-3 py-1 text-xs font-semibold text-taskor-ink">
                        {client.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(client)}
                          className="rounded-btn border border-taskor-mist px-3 py-2 text-sm font-medium text-taskor-ink"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client._id)}
                          className="rounded-btn border border-red-200 px-3 py-2 text-sm font-medium text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-taskor-ink/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-taskor-ink">
                  {editingClient ? "Edit Client" : "Add Client"}
                </h2>
                <p className="mt-1 text-sm text-taskor-slate">
                  Save client details for your workspace.
                </p>
              </div>
              <button onClick={closeModal} className="text-2xl leading-none text-taskor-slate">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  >
                    <option value="Active">Active</option>
                    <option value="Lead">Lead</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">Notes</label>
                  <textarea
                    name="notes"
                    rows="4"
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-btn border border-taskor-mist px-4 py-3 text-sm font-medium text-taskor-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white"
                >
                  {saving ? "Saving..." : editingClient ? "Update Client" : "Create Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}