import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ToDo } from "../Models/Todo.js";
import { isAuthenticated } from "../auth.js";

export const todoRouter = express.Router();

todoRouter.post("/addtodo", isAuthenticated, async (req, res) => {
  try {
    const todo = req.body;
    await new ToDo({ ...todo, creator: req.user._id }).save();
    res.status(200).json({ message: "New ToDo Created Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

todoRouter.get("/gettodo", isAuthenticated, async (req, res) => {
  try {
    const todos = await ToDo.find({ creator: req.user._id });
    if (todos) {
      res.status(200).json({ todos, message: "Todos fetched successfully" });
    } else {
      res.status(400).json({ message: "Unable to fetch Todos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});
todoRouter.delete("/todo/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const deleteStreak = await ToDo.findByIdAndDelete({ _id: req.params.id });
    if (!deleteStreak) {
      res;
      res.status(400).json({ message: "error occured" });
      return;
    } else {
      res.status(200).json({ message: "ToDo Deleted Successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

todoRouter.put("/todo/update/:id", isAuthenticated, async (req, res) => {
  try {
    const updateStreak = await ToDo.findById({ _id: req.params.id });
    updateStreak.isDone = !updateStreak.isDone;
    await updateStreak.save();
    res
      .status(200)
      .json({ message: "ToDo Updated Successfully!", updateStreak });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});
