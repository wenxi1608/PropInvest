import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./App.css";

// Pages
import Index from "./pages/index/Index";
import AllProjects from "./pages/project/AllProjects";
import ProjectByDistrict from "./pages/project/ProjectByDistrict";
import ProjectPage from "./pages/project-page/ProjectPage";

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
      </Routes>
    </div>
  );
}

export default App;
