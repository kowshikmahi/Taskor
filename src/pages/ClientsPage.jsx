import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
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
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-4 glass rounded-3xl p-5 shadow-card sm:p-6 md:flex-row md:items-center md:justify-between">
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
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white shadow-card sm:w-auto"
        >
          <Plus size={18} />
          <span>Add Client</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="glass rounded-3xl p-5 shadow-card">
          <p className="text-sm text-taskor-slate">Total Clients</p>
          <p className="mt-3 text-3xl font-bold text-taskor-ink">{clients.length}</p>
        </div>
        <div className="glass rounded-3xl p-5 shadow-card">
          <p className="text-sm text-taskor-slate">Active Clients</p>
          <p className="mt-3 text-3xl font-bold text-taskor-ink">{activeCount}</p>
        </div>
        <div className="glass rounded-3xl p-5 shadow-card">
          <p className="text-sm text-taskor-slate">Leads / Inactive</p>
          <p className="mt-3 text-3xl font-bold text-taskor-ink">{clients.length - activeCount}</p>
        </div>
      </div>

      <div className="glass rounded-3xl p-5 shadow-card sm:p-6">
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
          <>
            <div className="grid gap-3 md:hidden">
              {clients.map((client) => (
                <div
                  key={client._id}
                  className="rounded-2xl border border-white/55 bg-white/45 p-4 backdrop-blur dark:bg-white/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold text-taskor-ink">{client.name}</h3>
                      <p className="mt-1 text-sm text-taskor-slate">{client.company || "No company"}</p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-taskor-cloud px-3 py-1 text-xs font-semibold text-taskor-ink">
                      {client.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-taskor-slate">
                    <p className="truncate">{client.email || "No email"}</p>
                    <p>{client.phone || "No phone"}</p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openEditModal(client)}
                      className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-taskor-mist text-sm font-semibold text-taskor-ink transition hover:border-taskor-purple hover:text-taskor-purple"
                      aria-label={`Edit ${client.name}`}
                    >
                      <Pencil size={15} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      aria-label={`Delete ${client.name}`}
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-[760px] text-left">
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
                    <td className="px-4 py-4 text-taskor-slate">{client.company || "-"}</td>
                    <td className="px-4 py-4 text-taskor-slate">{client.email || "-"}</td>
                    <td className="px-4 py-4 text-taskor-slate">{client.phone || "-"}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-taskor-cloud px-3 py-1 text-xs font-semibold text-taskor-ink">
                        {client.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(client)}
                          className="inline-grid h-10 w-10 place-items-center rounded-xl border border-taskor-mist text-taskor-ink transition hover:border-taskor-purple hover:text-taskor-purple"
                          title="Edit client"
                          aria-label={`Edit ${client.name}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(client._id)}
                          className="inline-grid h-10 w-10 place-items-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
                          title="Delete client"
                          aria-label={`Delete ${client.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-taskor-ink/40 p-4">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-4 shadow-2xl sm:p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-taskor-ink">
                  {editingClient ? "Edit Client" : "Add Client"}
                </h2>
                <p className="mt-1 text-sm text-taskor-slate">
                  Save client details for your workspace.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="inline-grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-taskor-slate transition hover:bg-taskor-cloud hover:text-taskor-ink"
                aria-label="Close modal"
              >
                <X size={20} />
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

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex min-h-11 items-center justify-center rounded-btn border border-taskor-mist px-4 py-3 text-sm font-medium text-taskor-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-11 items-center justify-center rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white"
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



