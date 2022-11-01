import React, { useEffect, useState } from "react";
import apis from "../../apis/projects"
import { Card, Container, CircularProgress } from "@mui/material";
import Section from "./Section";
import Filter from "./Filter"
import ReactPaginate from "react-paginate"
import styles from "./Projects.scss"

const AllProjects = (props) => {

  const [districtFilter, setDistrictFilter] = useState("");

  const handleChange = (event) => {
    setDistrictFilter(event.target.value);
  };

  return(
    <div>
      <h1>All Projects</h1>
      <Filter districts={props.sortedDistricts} 
      handleChange={handleChange} districtFilter={districtFilter}
      />
        
      <Section 
      results={props.projects.map((p) => {return p.project})} 
      />
    </div>
  )
  }

export default AllProjects;


