import mongoose from "mongoose";
import Project from "../models/Project.js";
import Client from "../models/Client.js";

export async function getProjects(req, res) {
  try {
    const projects = await Project.find({ user: req.user._id })
      .populate("client", "name company email")
      .sort({ createdAt: -1 });

    return res.status(200).json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    return res.status(500).json({ message: "Server error fetching projects" });
  }
}

export async function getProjectById(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("client", "name company email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error("Get project by id error:", error);
    return res.status(500).json({ message: "Server error fetching project" });
  }
}

export async function createProject(req, res) {
  try {
    const { client, name, description, status, progress, dueDate } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Project name is required" });
    }

    let validClient = null;

    if (client) {
      if (!mongoose.isValidObjectId(client)) {
        return res.status(400).json({ message: "Invalid client selected" });
      }

      validClient = await Client.findOne({
        _id: client,
        user: req.user._id,
      });

      if (!validClient) {
        return res.status(400).json({ message: "Invalid client selected" });
      }
    }

    const project = await Project.create({
      user: req.user._id,
      client: validClient ? validClient._id : null,
      name: name.trim(),
      description: description?.trim() || "",
      status: status || "Planning",
      progress: typeof progress === "number" ? progress : 0,
      dueDate: dueDate || null,
    });

    const populatedProject = await Project.findById(project._id).populate(
      "client",
      "name company email"
    );

    return res.status(201).json(populatedProject);
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({ message: "Server error creating project" });
  }
}

export async function updateProject(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const { client, name, description, status, progress, dueDate } = req.body;

    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (client !== undefined) {
      if (!client) {
        project.client = null;
      } else {
        if (!mongoose.isValidObjectId(client)) {
          return res.status(400).json({ message: "Invalid client selected" });
        }

        const validClient = await Client.findOne({
          _id: client,
          user: req.user._id,
        });

        if (!validClient) {
          return res.status(400).json({ message: "Invalid client selected" });
        }

        project.client = validClient._id;
      }
    }

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({ message: "Project name is required" });
      }
      project.name = name.trim();
    }
    if (description !== undefined) project.description = description.trim();
    if (status !== undefined) project.status = status;
    if (progress !== undefined) project.progress = progress;
    if (dueDate !== undefined) project.dueDate = dueDate || null;

    await project.save();

    const updatedProject = await Project.findById(project._id).populate(
      "client",
      "name company email"
    );

    return res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({ message: "Server error updating project" });
  }
}

export async function deleteProject(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    return res.status(500).json({ message: "Server error deleting project" });
  }
}
