import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import "../index.css";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import loadingImg from "../assets/loading.gif";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const TaskList = ({ user, setUser }) => {
  const user2 = useSelector(selectUser);
  user = user2;
  // localStorage.setItem('user', JSON.stringify(user));
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
    user: user._id,
  });
  const { name } = formData;
  const history = useHistory();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const sortTasksByDueDate = (tasks) => {
    return tasks
      .slice()
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const notify = (msg) => {
    toast(msg);
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://54.191.239.161:5000/api/userTasks/${user._id}`
      );
      setTasks(data);
      setIsLoading(false);
    } catch (err) {
      notify(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    console.log(user._id);
    e.preventDefault();
    if (name === "") {
      notify("Input fiels cannot be empty");
    }
    try {
      await axios.post("http://54.191.239.161:5000/api/tasks", formData);
      notify("Task added sucessfully");
      getTasks();
      setFormData({ ...formData, name: "" });
    } catch (err) {
      notify(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://54.191.239.161:5000/api/tasks/${id}`);
      notify("Task deleted");
      getTasks();
    } catch (err) {
      notify(err.message);
    }
  };

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(cTask);
  }, [tasks]);

  const getSingleTask = async (task) => {
    setFormData({
      name: task.name,
      completed: false,
    });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") notify("Input field cannot be empty");
    try {
      await axios.put(
        `http://54.191.239.161:5000/api/tasks/${taskId}`,
        formData
      );
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (err) {
      notify(err.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: !task.completed,
    };
    try {
      await axios.put(
        `http://54.191.239.161:5000/api/tasks/${task._id}`,
        newFormData
      );
      !task.completed ? notify("Task completed") : notify("Task redo");
      getTasks();
    } catch (err) {
      notify(err.message);
    }
  };

  return (
    <div>
      <NavigationBar user={user} getTasks={getTasks} setUser={setUser} />

      {tasks.length > 0 && (
        <div className="--flex-between -pb">
          <p>
            <b>Total Tasks:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {sortTasksByDueDate(tasks).map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
                getTasks={getTasks}
              />
            );
          })}
        </>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default TaskList;
