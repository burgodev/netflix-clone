import React from "react";

import "./App.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";

// TODO: Stopped at 1:28:46

function App() {
  const user = null;
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/test" element={<h1>teste</h1>}></Route>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
