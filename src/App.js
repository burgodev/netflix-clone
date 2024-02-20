import React, { useEffect } from "react";

import "./App.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./state/userSlice";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

// TODO: Stopped at 3:57:00

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Cache from firebase to keep user logged
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.multiFactor.user.uid,
            email: userAuth.multiFactor.user.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/test" element={<h1>teste</h1>} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
