import React, { useEffect, useState } from "react"
import Section from "./Section"
import apis from "../../apis/projects"
import { useParams } from "react-router-dom"
import { CircularProgress, Grid } from "@mui/material";
import Filter from "./Filter";
import SearchBar from "../../components/navbar/SearchBar";
import styles from "./Projects.scss"

const ProjectByDistrict = (props) => {
  const params = useParams();
  const projectsByDistrict = props.projects?.filter((p) => {
    return p.rentalMedian[0].district === params.districtNo;
  });
  console.log(projectsByDistrict)

  const [districtFilter, setDistrictFilter] = useState("");
  
  const handleChange = (event) => {
    setDistrictFilter(event.target.value);
  };
  console.log("District Filter:", districtFilter)

  return (
    <div className="directory">
      <h1>District {params.districtNo}</h1>
      <Grid container direction="row">
          <Grid item>
            <div className="searchbar">
              <SearchBar projects={props.projects}/>
            </div>
          </Grid>
          <Grid item>
            <div className="filter">
              <Filter districts={props.sortedDistricts} handleChange={handleChange} districtFilter={districtFilter}/>
            </div>
          </Grid>
        </Grid>
      <Section 
      results={projectsByDistrict?.map((p) => {return p.project})} 
      />
    </div>
  )
}

export default ProjectByDistrict;