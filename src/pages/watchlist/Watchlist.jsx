// import jwt_decode from "jwt-decode"; 
import React, { useEffect, useState } from "react";
import apis from "../../apis/watchlist";
import WatchlistCard from "./Card";
import { Container, CircularProgress, Button } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

 const Watchlist = () => {

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");
  // const user = jwt_decode(token).data.email;

  const [watchedProjects, setWatchedProjects] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apis.getProjectsWatchedByUser(token);
      setWatchedProjects(response.data);
      setLoading(false)
    }

    fetchProjects()
  }, [token]);

  const allProjectsInWatchlist = watchedProjects?.map(p => <WatchlistCard key={p} results={p} />);
  

  if(loading) {
    return (
      <div>< CircularProgress/></div>
    )
  }

  return(
    <div>
      <h1>Property Watchlist</h1>
      <Button variant="outlined">
        <EditRoundedIcon/>
        Edit list
      </Button>
      <Container>
        {allProjectsInWatchlist}
      </Container>
    </div>
  )
 }

 export default Watchlist;