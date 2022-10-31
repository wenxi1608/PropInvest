import React, { useEffect, useState } from "react";
import apis from "../../apis/watchlist";
import WatchlistCard from "./Card";
import { Container, CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteButton from "./DeleteButton";

const Section = (props) => {

  const [watchedProjects, setWatchedProjects] = useState();
  const [loading, setLoading] = useState(true);

  console.log("props.edit:", props.edit);
  
  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apis.getProjectsWatchedByUser(props.token);
      setWatchedProjects(response.data);
      setLoading(false);
    }

    fetchProjects()
  }, []);

  const allProjectsInWatchlist = watchedProjects?.map(p => <WatchlistCard key={p} results={p} token={props.token} edit={props.edit}/>);
  
  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress /></div>
    )
  }

  return(
    <div>
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
            <Grid item xs={1} md={1}>
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

 export default Section;