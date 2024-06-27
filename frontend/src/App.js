import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import { useState } from "react";
import Task from "./components/Task";
import Form from "./components/Form";

function App() {
  const [user, setUser] = useState("");

  return (
    <div className="App">
      <Router>
        <Route
          exact
          path="/"
          render={(props) => <Login {...props} user={user} setUser={setUser} />}
        />
        <Route exact path="/signup" component={SignUp} />
        <Route
          path="/tasks"
          render={(props) => (
            <TaskList {...props} user={user} setUser={setUser} />
          )}
        />
      </Router>
    </div>
  );
}

export default App;
