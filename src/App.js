import React from "react";

import "./App.css";
import HomeScreen from "./HomeScreen";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// TODO: Stopped at 1:28:46

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/test" element={<h1>teste</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
