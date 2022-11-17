import React, { useEffect, useState } from "react";
import apis from "../../apis/watchlist";
import WatchlistCard from "./Card";
import { toast } from "react-toastify";
import { Container, CircularProgress, Grid, Box, Card, CardContent } from "@mui/material";

const Section = (props) => {

  const [watchedProjects, setWatchedProjects] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apis.getProjectsWatchedByUser(props.token);
      setWatchedProjects(response.data);
      setLoading(false);
    }

    fetchProjects()
  }, [watchedProjects]);

  // Delete project from watchlist when user clicks on delete button
  const handleDelete = async(projectName) => {
    
    try {
      const response = await apis.deleteFromWatchlist(projectName, props.token)
      if(response.data.error) {
        toast.error(response.data.error);
      } else {
        setWatchedProjects(watchedProjects.filter((p) => {
          return p !== projectName
        }))
        toast.success(`${projectName} REMOVED FROM WATCHLIST`);
      }
    } catch (err) {
      toast.error("Unable to remove from watchlist")
      console.log(err)
    }
  }

  const allProjectsInWatchlist = watchedProjects?.map(p => <WatchlistCard key={p} name={p} token={props.token} edit={props.edit} dataType={props.dataType} handleDelete={handleDelete} />);
  
  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress /></div>
    )
  }
  
  return(
    <div>
      <Container>
      <Card variant="outlined" style={{ marginTop: "2em", textAlign: "center", fontWeight: "bolder", color: "white", backgroundColor: "rgb(173, 102, 131)"}}> 
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={2} md={2}>
              Project
            </Grid>
            <Grid item xs={2} md={2}>
              Change in Past Year
            </Grid>
            <Grid item xs={2} md={2}>
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

 export default Section;