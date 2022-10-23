 import { useParams } from "react-router-dom";
 import React, {useEffect, useState} from "react"
 import apis from "../../apis/projects"
 import { CircularProgress } from "@mui/material";
 import Overview from "./Overview"
 import WatchlistButton from "./WatchlistButton";
 import CalculatorButton from "./CalculatorButton";
 import SaleData from "./SaleData";
 import RentalData from "./RentalData";

const ProjectPage = () => {

  const params = useParams()
  const projectName = params.projectName.replaceAll("-", " ");

  const [projectDetails, setProjectDetails] = useState({})
  const [rentalData, setRentalData] = useState({})
  const [salesData, setSalesData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apis.getProjectDetails(projectName);
      const rentalDataResponse = await apis.getRentalPsfByProject(projectName);
      const salesDataResponse = await apis.getSalesTxnByProject(projectName);
      setProjectDetails(response);
      setRentalData(rentalDataResponse);
      setSalesData(salesDataResponse);
      setLoading(false);
    }

    fetchProjects()
  }, [])

  console.log("Proj Name:", projectName)
  console.log("Project Details:", projectDetails)
  console.log("Rent Data:", rentalData)
  console.log("Loading:", loading)
  console.log("Sales Data:", salesData)
  
  if(loading) {
    return (
      <div>< CircularProgress/></div>
    )
  }

  return (
    <div>
      <Overview name={projectName} details={projectDetails} /> 
      
      <div className="watchlist-button">
        <WatchlistButton />
      </div>

      <div className="calculator-button">
        <CalculatorButton />
      </div>

      <div className="sale-data">
        {!salesData[0]? (
          <p>No sale transactions in the past year</p>
        ):(
          <SaleData details={salesData}/>
        )}
      </div>

      <div className="rental-data">
        {!rentalData[0]? (
          <p>No rental transactions in the past year</p>
        ):(
          <RentalData details={rentalData}/>
        )}
      </div>

    </div>
  )

 }

export default ProjectPage;