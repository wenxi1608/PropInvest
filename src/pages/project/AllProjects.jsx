import { useState } from "react";
import { Grid } from "@mui/material";
import Section from "./Section";
import Filter from "./Filter";
import styles from "./Projects.scss";
import SearchBar from "../../components/navbar/SearchBar";

const AllProjects = (props) => {

  const [districtFilter, setDistrictFilter] = useState("");

  const handleChange = (event) => {
    setDistrictFilter(event.target.value);
  };

  return(
    <div className="directory">
      <h1>Start your project search...</h1>
      <div className="search-filter">
        <Grid container direction="row">
          <Grid item>
            <div className="searchbar">
              <SearchBar projects={props.projects}/>
            </div>
          </Grid>
          <Grid item>
            <div className="filter">
              <Filter className="filter" districts={props.sortedDistricts} 
              handleChange={handleChange} districtFilter={districtFilter}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <Section 
      results={props.projects.map((p) => {return p.project})} 
      />
    </div>
  )
  }

export default AllProjects;


