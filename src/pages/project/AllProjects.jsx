import React, { useEffect, useState } from "react";
import apis from "../../apis/projects"
import { Card, Container, CircularProgress } from "@mui/material";
import Section from "./Section";
import Filter from "../filter/Filter"
import ReactPaginate from "react-paginate"
import styles from "./Projects.scss"

const AllProjects = () => {

  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async() => {
        const response = await apis.getAllProjects();
        setProjects(response);
        setLoading(false);
    }

    fetchProjects()
  }, [])
  
  if(loading) {
    return (
      <div>< CircularProgress/></div>
    )
  }

  return(
    <div>
      <h1>All Projects</h1>
      <Section 
      title="all" 
      results={projects.map((p) => {return p.project})} 
      district={projects.map((p) => {return p.rentalMedian[0].district})} 
      />
    </div>
  )
}

// const Projects = () => {
//   const [projects, setProjects] = useState({});
//   const [loading, setLoading] = useState(false)
//   const [page, setPage] = useState(1);
  
//   useEffect(() => {
//     const fetchProjects = async() => {
//       setLoading(true)
//       try {
//         const response = await apis.getAllProjects();
//         const data = await response.data;
//         setProjects(data);
//       } catch(err) {
//         console.log("Error:", err);
//       }
//       setLoading(false);
//     }

//     // const allProjects = projects.map?.((p) => {
//     //   return p.project});
//     // const sortedProjects = allProjects.sort()
//     // setSortedProjects(sortedProjects)
    
//     fetchProjects();
//   },[])
  
//   console.log("projects:", projects.Result)
//   // console.log("sorted projects:", sortedProjects)

//   // Get all the names of the projects and sort by alphabetical order
  
  
//   // Pagination
//   // const projectsPerPage = 50
//   // const pagesVisited = page * projectsPerPage
//   // const displayProjects = sortedProjects.slice(pagesVisited, pagesVisited + projectsPerPage).map(p => <ProjectCard key={p} results={p} />);
//   // const changePage = ({selected}) => {
//   //   setPage(selected)
//   // }

//   return(
//     <div>
//       <h1>All Projects</h1>

//       {loading === true
//         ?
//         (<CircularProgress />)  
//         :
//         (
//           <Container>
//             <ProjectCard results={projects.result}/>
//           </Container>

//         )
//       }

//       {/* <ReactPaginate
//         previousLabel = {"<"}
//         nextLabel = {">"}
//         pageCount = {Math.ceil(sortedProjects.length / projectsPerPage)}
//         onPageChange={changePage}
//         containerClassName={"pagination"}
//         previousLinkClassName={"previous-button"}
//         nextLinkClassName={"next-button"}
//         activeClassName={"active"}
//       /> */}

//     </div>
//   )
// }


export default AllProjects;


