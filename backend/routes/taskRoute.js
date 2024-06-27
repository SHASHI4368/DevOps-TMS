const express = require('express');
const {Task} = require('../models/taskModel');
const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTask,
  updateTask,
  getUserById,
  createUser,
  getAllUsers
} = require("../controllers/taskController");
const router = express.Router();


//create a task
router.post("/api/tasks/", createTask);

//get all tasks
router.get("/api/userTasks/:user", getAllTasks);

//get a single task
router.get("/api/tasks/:id", getTaskById);

//delete a task
router.delete("/api/tasks/:id", deleteTask);

//update a task
router.put("/api/tasks/:id", updateTask);

// log in
router.get("/api/login/:id", getUserById);

// sign up
router.post("/api/signup/", createUser);

//get all users
router.get("/users/", getAllUsers);


module.exports = router;