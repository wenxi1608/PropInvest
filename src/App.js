import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import apis from "../src/apis/projects";
import { CircularProgress } from "@mui/material";

// Pages
import Index from "./pages/index/Index";
import AllProjects from "./pages/project/AllProjects";
import ProjectByDistrict from "./pages/project/ProjectByDistrict";
import ProjectPage from "./pages/project-page/ProjectPage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Watchlist from "./pages/watchlist/Watchlist";
import Calculator from "./pages/calculator/Calculator";
import CreationForm from "./pages/calculator/CreationForm";
import jwt_decode from "jwt-decode";

// Components
import Navbar from "./components/navbar/Navbar";
import Guest from "./components/auth/Guest";
import Auth from "./components/auth/Auth";

function App() {
  const [tokenState, setTokenState] = useState();
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchProject, setSearchProject] = useState(false);

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

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await apis.getAllProjects();
      setProjects(response);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // Get all the district numbers: (i) get unique no.s, (ii) sort by ascending
  const allDistricts = projects?.map((p) => {
    return p.rentalMedian[0].district;
  });
  const districtNo = new Set(allDistricts);
  const sortedDistricts = Array.from(districtNo).sort((a, b) => a - b);

  if (loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar
        tokenState={tokenState}
        user={user}
        setTokenState={setTokenState}
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/projects"
          element={
            <AllProjects
              projects={projects}
              sortedDistricts={sortedDistricts}
            />
          }
        />
        <Route
          path="/projects/district/:districtNo"
          element={
            <ProjectByDistrict
              projects={projects}
              sortedDistricts={sortedDistricts}
            />
          }
        />
        <Route
          path="/projects/:projectName"
          element={<ProjectPage searchProject={searchProject} />}
        />
        <Route path="/register" element={<Guest component={Register} />} />
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
        <Route path="/watchlist" element={<Auth component={Watchlist} />} />
        <Route
          path="/dashboard" // Display list of projects
          element={<Auth component={Dashboard} />}
        />
        <Route
          path="/calculator/:projectName" // View and edit calculator for specified project
          element={<Auth component={Calculator} />}
        />
        <Route
          path="/calculator/create/:projectName" // Form to create new calculator for project
          element={<Auth component={CreationForm} />}
        />
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
