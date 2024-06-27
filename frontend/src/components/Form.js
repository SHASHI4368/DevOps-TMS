import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../Form.css";
import bgImg from "../assets/back.jpg";

const Form = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const notify = (msg) => {
    toast(msg);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:5000/users/");
      const userExists = response.data.some((user) => user.email === email);

      if (!userExists) {
        notify("Please enter a valid email");
      } else {
        const user = response.data.find((user) => user.email === email);

        if (user.password === password) {
          setUser(user);
          history.push("/tasks");
        } else {
          notify("Please check the password");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={submit}>Login</button>
          <br />
          <br />
          <br />
          <a href="/signup">Don't have an account? Sign up</a>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Form;
