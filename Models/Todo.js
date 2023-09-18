import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const todoSchema = new mongoose.Schema({
  todoname: {
    type: String,
  },
  deadline: {
    type: String,
  },

  isDone: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
});

export const ToDo = mongoose.model("ToDo", todoSchema);
