import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const WatchlistCard = (props) => {
  const getProject = [props.results];
  const projectUrl = getProject.toString().replaceAll(" ", "-");
  
  return (
    
      <Card sx={{ minWidth: 275 }} variant="outlined" style={{marginBottom: "1em"}}> 
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
        <Link to={`/projects/${projectUrl}`} style={{textDecoration: "none"}}>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            {getProject}
          </Typography>
        </Link>
        </Grid>
        <Grid item xs={12} md={5}>
          <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>1 Year</div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>3 Years</div>
        </Grid>
      </Grid>
    </Box>
        </CardContent>
      </Card>
  );
}

export default WatchlistCard;