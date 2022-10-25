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

// Components
import Navbar from "./components/navbar/Navbar";

function App() {
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
        <Route path="/register" element={<Guest component={Register} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
