import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Pages
import Index from "./pages/index/Index";
import AllProjects from "./pages/project/AllProjects";
import ProjectByDistrict from "./pages/project/ProjectByDistrict";
import ProjectPage from "./pages/project-page/ProjectPage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Guest from "./components/auth/Guest";
import jwt_decode from "jwt-decode";

// Components
import Navbar from "./components/navbar/Navbar";

function App() {
  const [tokenState, setTokenState] = useState();
  const [user, setUser] = useState();

  const token = localStorage.getItem("user_token");
  const tokenToSend = "Bearer " + token;

  const getToken = async () => {
    setTokenState(token);
    if (tokenState) {
      setUser(jwt_decode(tokenState).data.email);
    }
  };

  useEffect(() => {
    getToken();
  }, [tokenState]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route
          path="/projects/district/:districtNo"
          element={<ProjectByDistrict />}
        />
        <Route path="/projects/:projectName" element={<ProjectPage />} />
        <Route
          path="/register"
          element={
            <Guest
              component={Register}
              setTokenState={setTokenState}
              user={user}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Guest
              component={Login}
              setTokenState={setTokenState}
              user={user}
            />
          }
        />
        {/* <Route path="/dashboard" element={<Auth component={Dashboard} />} /> */}
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
