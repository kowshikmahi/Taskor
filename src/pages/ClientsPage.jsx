import React, { useMemo, useState } from "react";
import ClientsHeader from "../components/clients/ClientsHeader";
import ClientFilters from "../components/clients/ClientFilters";
import ClientsTable from "../components/clients/ClientsTable";
import AddClientModal from "../components/clients/AddClientModal";

const initialClients = [
  {
    id: 1,
    name: "BlueCart",
    contactPerson: "Arjun Mehta",
    email: "arjun@bluecart.com",
    company: "BlueCart",
    status: "Active",
    projects: 3,
    totalBilled: "₹42,000",
    lastActivity: "2h ago",
  },
  {
    id: 2,
    name: "OptiCare Clinic",
    contactPerson: "Dr. Sneha Rao",
    email: "sneha@opticare.com",
    company: "OptiCare",
    status: "Active",
    projects: 2,
    totalBilled: "₹28,500",
    lastActivity: "Yesterday",
  },
  {
    id: 3,
    name: "Nova Interiors",
    contactPerson: "Karan Shah",
    email: "karan@novainteriors.com",
    company: "Nova Interiors",
    status: "Lead",
    projects: 1,
    totalBilled: "₹8,000",
    lastActivity: "3 days ago",
  },
  {
    id: 4,
    name: "Personal Brand",
    contactPerson: "Kowshik",
    email: "hello@taskor.dev",
    company: "Personal Brand",
    status: "Active",
    projects: 4,
    totalBilled: "₹15,000",
    lastActivity: "Today",
  },
  {
    id: 5,
    name: "GreenMint Studio",
    contactPerson: "Aisha Khan",
    email: "aisha@greenmint.io",
    company: "GreenMint Studio",
    status: "Inactive",
    projects: 0,
    totalBilled: "₹0",
    lastActivity: "2 weeks ago",
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ? true : client.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [clients, search, status]);

  const stats = {
    total: clients.length,
    active: clients.filter((c) => c.status === "Active").length,
    leads: clients.filter((c) => c.status === "Lead").length,
    inactive: clients.filter((c) => c.status === "Inactive").length,
  };

  function handleAddClient(newClient) {
    const client = {
      id: Date.now(),
      ...newClient,
      projects: 0,
      totalBilled: "₹0",
      lastActivity: "Just now",
    };

    setClients((prev) => [client, ...prev]);
    setShowModal(false);
  }

  return (
    <div className="space-y-6">
      <ClientsHeader stats={stats} onAddClient={() => setShowModal(true)} />

      <ClientFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <ClientsTable clients={filteredClients} />

      <AddClientModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddClient}
      />
    </div>
  );
}