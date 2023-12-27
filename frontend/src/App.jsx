import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import AdminDash from "./components/AdminDash";

function App() {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("userData");
        if (token) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = (value) => {
    setLogin(value);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar login={login} logoutClick={handleLogin} />
        <Routes>
          <Route path="/" element={login ? <AdminDash /> : <Home />} />
          <Route
            path="sign-in"
            element={!login ? <SignIn login={handleLogin} /> : <Navigate replace to="/" />}
          />
          <Route
            path="sign-up"
            element={!login ? <SignUp login={handleLogin} /> : <Navigate replace to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
