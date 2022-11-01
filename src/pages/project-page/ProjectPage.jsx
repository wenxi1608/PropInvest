 import { useParams } from "react-router-dom";
 import React, {useEffect, useState} from "react"
 import apisProjects from "../../apis/projects";
 import apisWatchlist from "../../apis/watchlist";
 import { CircularProgress } from "@mui/material";
 import Overview from "./Overview"
 import WatchlistButton from "./WatchlistButton";
 import CalculatorButton from "./CalculatorButton";
 import SaleData from "./SaleData";
 import RentalData from "./RentalData";
 import { toast } from "react-toastify";

const ProjectPage = () => {

  const params = useParams()
  const projectName = params.projectName.replaceAll("-", " ");

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const [projectDetails, setProjectDetails] = useState({})
  const [rentalData, setRentalData] = useState({})
  const [salesData, setSalesData] = useState({})
  const [loading, setLoading] = useState(true)
  const [watched, setWatched] = useState(false)
  const [watchlistStatus, setWatchlistStatus] = useState("");

  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apisProjects.getProjectDetails(projectName);
      const rentalDataResponse = await apisProjects.getRentalPsfByProject(projectName);
      const salesDataResponse = await apisProjects.getSalesTxnByProject(projectName);
      // To check if project already exists in watchlist, if yes, disable add button
      const watchlistStatusResponse = await apisWatchlist.getProjectsWatchedByUser(token)
      setProjectDetails(response);
      setRentalData(rentalDataResponse);
      setSalesData(salesDataResponse);
      setWatchlistStatus(watchlistStatusResponse.data)
      setLoading(false);
    }

    fetchProjects()
  }, [])
 
  const handleSubmit = async(e) => {
    
    try {
      const response = await apisWatchlist.addToWatchlist(projectName, token)
      if(response.data.error) {
        toast.error(response.data.error)
      } else {
        setWatched(true)
        toast.success(`${projectName} ADDED TO WATCHLIST`);
      }
    } catch (err) {
      toast.error("Unable to add to watchlist")
      console.log(err)
    }
  }
  
  if(loading) {
    return (
      <div>< CircularProgress/></div>
    )
  }

  return (
    <div>
      <Overview name={projectName} details={projectDetails} /> 
      
      <div className="watchlist-button">
        <WatchlistButton tokenExists={tokenExists} watchlistStatus={watchlistStatus} handleSubmit={handleSubmit} projectName={projectName} watched={watched}/>
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