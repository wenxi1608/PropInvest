import React, { useEffect, useState } from "react"
import Section from "./Section"
import apis from "../../apis/projects"
import { useParams } from "react-router-dom"
import { CircularProgress } from "@mui/material";

const District = (props) => {
  const params = useParams();
  const [projects, setProjects] = useState({});
  const [projectsByDistrict, setProjectsByDistrict] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async() => {
      const all = await apis.getAllProjects();
      setProjects(all);
      const byDistrict = await apis.getProjectsByDistrict(params.districtNo);
      setProjectsByDistrict(byDistrict);
      setLoading(false)
    }

    fetchProjects()
  }, [])

  console.log("Projects by district:", projectsByDistrict)

  if(loading) {
    return (
      <div>< CircularProgress/></div>
    )
  }

  return (
    <>
      <h1>District</h1>
      <Section 
      title="section"
      results={projectsByDistrict.map((p) => {return p.project})} 
      district={projects.map((p) => {return p.rentalMedian[0].district})}
      />
    </>
  )
}

export default District;