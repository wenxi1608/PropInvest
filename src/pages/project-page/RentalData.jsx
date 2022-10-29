import styles from "./RentalData.scss"
import React, { useEffect, useState } from "react"
import apis from "../../apis/projects"
import { CircularProgress } from "@mui/material";

const RentalData = (props) => {

  const [allDistrictData, setAllDistrictData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apis.getProjectsByDistrict(props.details[0].rentalMedian[0].district);
      setAllDistrictData(response);
      setLoading(false)
    }

    fetchProjects()
  }, [])
  console.log(allDistrictData)

  // 1. Get the past year's rental data for the selected project (i.e. all 4 quarters of 2021)
  let sumPsf = 0
  const medianPsf = props.details[0].rentalMedian
  const pastYrData = medianPsf.filter((p) => {
    return p.refPeriod === "2021Q1" || p.refPeriod === "2021Q2" || p.refPeriod === "2021Q3" || p.refPeriod === "2021Q4"
  })

  for (let i = 0; i < pastYrData.length; i++) {
    sumPsf += pastYrData[i].median
  }
  
  // 2. Get the average of all the project's rental median results
  const avgPsf = (sumPsf / pastYrData.length).toFixed(2)
  
  return(
    <div className="data">
      <h1>Average Rental PSF: {pastYrData.length !== 0 ? (`$${avgPsf}`) : ("No data available")}</h1>
      <h1>Transaction Volume: {pastYrData.length}</h1>
      <p>based on past year's transactions</p>
    </div>
  )
}

export default RentalData;