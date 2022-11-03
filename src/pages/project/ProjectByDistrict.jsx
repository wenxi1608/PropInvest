import React, { useEffect, useState } from "react"
import Section from "./Section"
import apis from "../../apis/projects"
import { useParams } from "react-router-dom"
import { CircularProgress } from "@mui/material";
import Filter from "./Filter";
import SearchBar from "../../components/navbar/SearchBar";

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
    <>
      <h1>District {params.districtNo}</h1>
      <SearchBar />
      <Filter districts={props.sortedDistricts} handleChange={handleChange} districtFilter={districtFilter}/>
      <Section 
      results={projectsByDistrict?.map((p) => {return p.project})} 
      />
    </>
  )
}

export default ProjectByDistrict;