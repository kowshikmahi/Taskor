import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    return res.status(500).json({ message: "Server error fetching tasks" });
  }
}

export async function getTaskById(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Get task by id error:", error);
    return res.status(500).json({ message: "Server error fetching task" });
  }
}

export async function createTask(req, res) {
  try {
    const { title, description, project, projectName, status, priority, dueDate } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    let validProject = null;

    if (project) {
      if (!mongoose.isValidObjectId(project)) {
        return res.status(400).json({ message: "Invalid project selected" });
      }

      validProject = await Project.findOne({
        _id: project,
        user: req.user._id,
      });

      if (!validProject) {
        return res.status(400).json({ message: "Invalid project selected" });
      }
    }

    const task = await Task.create({
      user: req.user._id,
      title: title.trim(),
      description: description?.trim() || "",
      project: validProject ? validProject._id : null,
      projectName: validProject?.name || projectName?.trim() || "",
      status: status || "Todo",
      priority: priority || "Medium",
      dueDate: dueDate || null,
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({ message: "Server error creating task" });
  }
}

export async function updateTask(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const { title, description, project, projectName, status, priority, dueDate } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }
    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (project !== undefined) {
      if (!project) {
        task.project = null;
      } else {
        if (!mongoose.isValidObjectId(project)) {
          return res.status(400).json({ message: "Invalid project selected" });
        }

        const validProject = await Project.findOne({
          _id: project,
          user: req.user._id,
        });

        if (!validProject) {
          return res.status(400).json({ message: "Invalid project selected" });
        }

        task.project = validProject._id;
        task.projectName = validProject.name;
      }
    }
    if (projectName !== undefined) task.projectName = projectName.trim();
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate || null;

    const updatedTask = await task.save();

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json({ message: "Server error updating task" });
  }
}

export async function deleteTask(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({ message: "Server error deleting task" });
  }
}
