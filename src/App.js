import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./App.css";

// Pages
import Index from "./pages/index/Index";
import Projects from "./pages/project/Projects";
import District from "./pages/project/District";

// Components
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/district/:districtNo" element={<District />} />
      </Routes>
    </div>
  );
}

export default App;
