import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; // Import useHistory
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const notify = (msg) => {
    toast(msg);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      notify("Please enter all the details");
      return;
    }

    try {
      const response = await axios.get("http://54.191.239.161:5000/users/");
      if (response.data.some((user) => user.email === email)) {
        notify("Email already in use");
      } else {
        await axios.post("http://54.191.239.161:5000/api/signup/", {
          email: email,
          password: password,
        });
        notify("User Added successfully");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          history.push("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        <p>Enter your Email and Password </p>
        <br />
        <br />
        <form>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={submit}>Sign up</button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SignUp;
