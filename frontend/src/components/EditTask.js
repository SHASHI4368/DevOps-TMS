// EditTask.js
import React, { useEffect, useState } from "react";
import "../AddTask.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const EditTask = ({ isOpen, onClose, task}) => {
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(
    format(new Date(task.dueDate), "yyyy-MM-dd")
  );
  const [description, setDescription] = useState(task.description);


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

  const updateTask = async (e) => {
   console.log(task._id);
   console.log(task.title);

    e.preventDefault();
    if (title === "" || description === "") {
      notify("Input fiels cannot be empty");
    }
    try {
      const updated = {
        title: title,
        dueDate: dueDate,
        description: description,
        completed:false
      };
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updated);
      notify("Task edited sucessfully");
      onClose();
    } catch (err) {
      notify(err.message);
    }
  };
  return isOpen ? (
    <div className="task-popup">
      <div className="task-popup-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Task</h2>
        <form>
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title:</label>
            <input
              type="text"
              id="taskTitle"
              placeholder="Enter task title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input type="date" id="dueDate" value={dueDate} onChange={handleDateChange} />
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">Task Description:</label>
            <textarea
              id="taskDescription"
              placeholder="Enter task description"
              rows="4"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <button className="add-button" onClick={updateTask}>
            Update Task
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditTask;
