import React, { useState } from "react";
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";
import EditTask from "./EditTask";
import {format} from 'date-fns'

const Task = ({
  task,
  index,
  deleteTask,
  getSingleTask,
  setToComplete,
  getTasks,
}) => {
  const [isTaskFormOpen, setTaskFormOpen] = useState(false);

  const openTaskForm = () => {
    setTaskFormOpen(true);
  };

  const closeTaskForm = () => {
    setTaskFormOpen(false);
    getTasks();
  };

  return (
    <div className={task.completed ? "task completed" : "task"}>
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>Before {format(new Date(task.dueDate), "dd/MM/yyyy")}</p>
        <br />
        <hr />
        <br />
        <p>{task.description}</p>
      </div>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => setToComplete(task)} />
        <FaEdit color="purple" onClick={openTaskForm} />
        <FaRegTrashAlt
          color="red"
          onClick={() => {
            deleteTask(task._id);
          }}
        />
      </div>
      <EditTask isOpen={isTaskFormOpen} onClose={closeTaskForm} task={task} />
    </div>
  );
};

export default Task;
