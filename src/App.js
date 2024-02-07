import React, { useEffect } from "react";

import "./App.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import { auth } from "./firebase";

// TODO: Stopped at 1:28:46

function App() {
  const user = null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //logged
        console.log(userAuth);
      } else {
        //logged out
      }
    });

    return unsubscribe;
  }, []);

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
