const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a task"],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: String,
      required: true
    },
    dueDate:{
      type: Date,
      required: true
    },
    description:{
      type:String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Task, User };
