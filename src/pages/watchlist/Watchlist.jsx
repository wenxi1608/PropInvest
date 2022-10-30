// import jwt_decode from "jwt-decode"; 
import React, { useEffect, useState } from "react";
import apis from "../../apis/watchlist";
import WatchlistCard from "./Card";
import { Container, CircularProgress, Button, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

 const Watchlist = () => {

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const [watchedProjects, setWatchedProjects] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apis.getProjectsWatchedByUser(token);
      setWatchedProjects(response.data);
      setLoading(false);
    }

    fetchProjects()
  }, [token]);

  const allProjectsInWatchlist = watchedProjects?.map(p => <WatchlistCard key={p} results={p}/>);
  
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  if(loading) {
    return (
      <div>< CircularProgress/></div>
    )
  }

  return(
    <div>
      <Container>
        <Grid container spacing={{ md: 3}} columns={{ sm: 8, md: 12}}> 
          <Grid item xs={10}>
            <h1>Property Watchlist</h1>
          </Grid>
          <Grid item xs={2} alignContent="center">
            <Button variant="outlined">
              <EditRoundedIcon/>
              Edit list
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Stack direction="row" spacing={1}>
          <Chip label="Rent Psf" variant="outlined" onClick={handleClick} />
          <Chip label="Sale Psf" variant="outlined" onClick={handleClick} disabled={true} />
        </Stack>
      </Container>
      <Container>
      <Card variant="outlined" style={{marginBottom: "0.5em", marginTop: "1em", textAlign: "center"}}> 
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={2} md={2}>
              Project
            </Grid>
            <Grid item xs={3} md={3}>
              % Change in Past Year
            </Grid>
            <Grid item xs={2} md={2}>
              2022
            </Grid>
            <Grid item xs={2} md={2}>
              2021
            </Grid>
            <Grid item xs={2} md={2}>
              2020
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
        {allProjectsInWatchlist}
      </Container>
    </div>
  )
 }

 export default Watchlist;