import Client from "../models/Client.js";

export async function getClients(req, res) {
  try {
    const clients = await Client.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(clients);
  } catch (error) {
    console.error("Get clients error:", error);
    return res.status(500).json({ message: "Server error fetching clients" });
  }
}

export async function getClientById(req, res) {
  try {
    const client = await Client.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json(client);
  } catch (error) {
    console.error("Get client by id error:", error);
    return res.status(500).json({ message: "Server error fetching client" });
  }
}

export async function createClient(req, res) {
  try {
    const { name, company, email, phone, status, notes } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Client name is required" });
    }

    const client = await Client.create({
      user: req.user._id,
      name: name.trim(),
      company: company?.trim() || "",
      email: email?.trim().toLowerCase() || "",
      phone: phone?.trim() || "",
      status: status || "Active",
      notes: notes?.trim() || "",
    });

    return res.status(201).json(client);
  } catch (error) {
    console.error("Create client error:", error);
    return res.status(500).json({ message: "Server error creating client" });
  }
}

export async function updateClient(req, res) {
  try {
    const { name, company, email, phone, status, notes } = req.body;

    const client = await Client.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (name !== undefined) client.name = name.trim();
    if (company !== undefined) client.company = company.trim();
    if (email !== undefined) client.email = email.trim().toLowerCase();
    if (phone !== undefined) client.phone = phone.trim();
    if (status !== undefined) client.status = status;
    if (notes !== undefined) client.notes = notes.trim();

    const updatedClient = await client.save();

    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Update client error:", error);
    return res.status(500).json({ message: "Server error updating client" });
  }
}

export async function deleteClient(req, res) {
  try {
    const client = await Client.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    await client.deleteOne();

    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Delete client error:", error);
    return res.status(500).json({ message: "Server error deleting client" });
  }
}