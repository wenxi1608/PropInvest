import React, { useEffect, useState } from "react";
import ProjectCard from "./Card";
import Filter from "../filter/Filter"
import ReactPaginate from "react-paginate";
import styles from "./Projects.scss";
import { Container } from "@mui/material";

const Section = (props) => {
  
// Sort projects by alphabetical order
const sortedProjects = props.results.sort()
console.log("sorted Projects:", sortedProjects)

// District Filter
const districts = new Set(props.district)
const sortedDistricts = Array.from(districts).sort((a, b) => a - b);
console.log("sorted Districts:", sortedDistricts)
const [districtFilter, setDistrictFilter] = useState("")
const handleChange = (event) => {
  setDistrictFilter(event.target.value);
};

// Pagination
const [page, setPage] = useState(0);
const projectsPerPage = 50
const pagesVisited = page * projectsPerPage
const displayProjects = sortedProjects.slice(pagesVisited, pagesVisited + projectsPerPage).map(p => <ProjectCard key={p} results={p} />);
const changePage = ({selected}) => {
    setPage(selected)
  }

  if(!sortedProjects) {
    return (
      <div>""</div>
    )
  }

  return(
    <div>
      <Filter districts={sortedDistricts} handleChange={handleChange}  districtSelected={districtFilter}/>
        
      <Container>
        {displayProjects}
      </Container>

      <ReactPaginate
        previousLabel = {"<"}
        nextLabel = {">"}
        pageCount = {Math.ceil(sortedProjects.length / projectsPerPage)}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous-button"}
        nextLinkClassName={"next-button"}
        activeClassName={"active"}
      />

      </div>
    )

}


export default Section;


