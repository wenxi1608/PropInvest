 import { useParams } from "react-router-dom";
 import React, {useEffect, useState} from "react"
 import apisProjects from "../../apis/projects";
 import apisWatchlist from "../../apis/watchlist";
 import apisCalculator from "../../apis/calculator";
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

  const [projectDetails, setProjectDetails] = useState({});
  const [rentalData, setRentalData] = useState({});
  const [salesData, setSalesData] = useState({});
  const [inWatchlist, setInWatchlist] = useState(false);
  const [calculatorStatus, setCalculatorStatus] = useState(false);
  const [watchlistStatus, setWatchlistStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apisProjects.getProjectDetails(projectName);
      const rentalDataResponse = await apisProjects.getRentalPsfByProject(projectName);
      const salesDataResponse = await apisProjects.getSalesTxnByProject(projectName);

      // To check if project already exists in user's watchlist/calculator
      const watchlistStatusResponse = await apisWatchlist.getProjectsWatchedByUser(token);
      const calculatorStatusResponse = await apisCalculator.getUserCalculators(token);
  
      setProjectDetails(response);
      setRentalData(rentalDataResponse);
      setSalesData(salesDataResponse);
      setWatchlistStatus(watchlistStatusResponse.data);
      setCalculatorStatus(calculatorStatusResponse.data);
      setLoading(false);
    }

    fetchProjects()
  }, [])

  // HANDLE ADD TO CALCULATOR
  const handleAddToWatchlist = async(e) => {
    
    try {
      const response = await apisWatchlist.addToWatchlist(projectName, token)
      if(response.data.error) {
        toast.error(response.data.error)
      } else {
        setInWatchlist(true)
        toast.success(`${projectName} ADDED TO WATCHLIST`);
      }
    } catch (err) {
      toast.error("Unable to add to watchlist")
      console.log(err)
    }
  }
  
  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress/></div>
    )
  }

  return (
    <div>
      
      <h1>{projectName}</h1>
      <h5>{projectDetails[0].street}</h5> 
      <h5>District {projectDetails[0].rental[0].district}</h5>
      
      <div className="watchlist-button">
        <WatchlistButton tokenExists={tokenExists} watchlistStatus={watchlistStatus} handleAddToWatchlist={handleAddToWatchlist} projectName={projectName} inWatchlist={inWatchlist}/>
      </div>

      <div className="calculator-button">
        <CalculatorButton tokenExists={tokenExists} projectName={projectName}
         calculatorStatus={calculatorStatus}
         />
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