// AddTask.js
import React, { useState } from "react";
import "../AddTask.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = ({ isOpen, onClose, user }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const notify = (msg) => {
    toast(msg);
  };

  const handleDateChange = (e) => {
    setDueDate(new Date(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const createTask = async (e) => {
    console.log(user._id);
    e.preventDefault();
    if (title === "" || description === "") {
      notify("Input fiels cannot be empty");
    }
    try {
      const task = {
        title: title,
        user: user._id,
        dueDate: dueDate,
        description: description,
      };
      await axios.post("http://54.191.239.161:5000/api/tasks", task);
      notify("Task added sucessfully");
      onClose();
    } catch (err) {
      notify(err.message);
      // console.log("Message");
    }
  };
  return isOpen ? (
    <div className="task-popup">
      <div className="task-popup-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Add Task</h2>
        <form>
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title:</label>
            <input
              type="text"
              id="taskTitle"
              placeholder="Enter task title"
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input type="date" id="dueDate" onChange={handleDateChange} />
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">Task Description:</label>
            <textarea
              id="taskDescription"
              placeholder="Enter task description"
              rows="4"
              onChange={handleDescriptionChange}
            />
          </div>
          <button className="add-button" onClick={createTask}>
            Add Task
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddTask;
