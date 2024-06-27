import React, { useState } from "react";
import "../NavigationBar.css";
import Logo1 from "../assets/Logo-1.png";
import AddTask from "./AddTask";
import { Link, useHistory } from "react-router-dom";

const NavigationBar = ({ user, getTasks, setUser }) => {
  const history = useHistory();
  const [isTaskFormOpen, setTaskFormOpen] = useState(false);

  const openTaskForm = () => {
    setTaskFormOpen(true);
  };

  const closeTaskForm = () => {
    setTaskFormOpen(false);
    getTasks();
  };

  const signOut = () => {
    setUser('');
    history.push("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo1} alt="Logo" />
        <h2>ORGANIZYNC</h2>
      </div>
      <div className="navbar-right">
        <button className="navbar-button" onClick={openTaskForm}>
          Create Task
        </button>
        <button className="navbar-button" onClick={signOut}>
          Log Out
        </button>
      </div>
      <AddTask user={user} isOpen={isTaskFormOpen} onClose={closeTaskForm} />
    </nav>
  );
};

export default NavigationBar;
