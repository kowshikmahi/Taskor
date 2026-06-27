import React from "react";

const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+91 9876543210",
    projects: 6,
    status: "Active",
  },
  {
    id: 2,
    name: "TechNova",
    email: "hello@technova.com",
    phone: "+91 9999999999",
    projects: 3,
    status: "Active",
  },
  {
    id: 3,
    name: "Pixel Studio",
    email: "admin@pixel.com",
    phone: "+91 8888888888",
    projects: 2,
    status: "Inactive",
  },
];

export default function ClientTable() {
  return (
    <div className="glass rounded-[28px] overflow-hidden shadow-card">

      <table className="w-full">

        <thead className="bg-taskor-cloud">

          <tr>

            <th className="text-left px-8 py-5">

              Client

            </th>

            <th>Email</th>

            <th>Phone</th>

            <th>Projects</th>

            <th>Status</th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {clients.map((client) => (

            <tr
              key={client.id}
              className="border-t border-slate-100 hover:bg-taskor-cloud transition"
            >

              <td className="px-8 py-6">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-taskor-gradient flex items-center justify-center text-white font-bold">

                    {client.name.charAt(0)}

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      {client.name}

                    </h3>

                  </div>

                </div>

              </td>

              <td>{client.email}</td>

              <td>{client.phone}</td>

              <td>{client.projects}</td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    client.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {client.status}
                </span>

              </td>

              <td>

                <button className="text-taskor-purple font-semibold">

                  Edit

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}