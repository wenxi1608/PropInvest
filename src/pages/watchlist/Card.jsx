import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react"
import apis from "../../apis/projects"
import { Container, CircularProgress, Button } from "@mui/material";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const WatchlistCard = (props) => {
  const [rentalData, setRentalData] = useState({})
  const [loading, setLoading] = useState(true)

  const getProject = [props.results];
  const projectUrl = getProject.toString().replaceAll(" ", "-");
  
  useEffect(() => {
    const fetchProjects = async() => {
      const rentalDataResponse = await apis.getRentalPsfByProject(getProject[0]);
      setRentalData(rentalDataResponse)
      setLoading(false)
    }
    fetchProjects()
  }, [])
  
  const allRentalPsf = rentalData[0]?.rentalMedian
  
  // Get the data from two years ago (2020) and one year ago (2021)
  const medianPsfFromTwoYearsAgo = allRentalPsf?.filter((p) => {
    return p.refPeriod === "2020Q1" || p.refPeriod === "2020Q2" || p.refPeriod === "2020Q3" || p.refPeriod === "2020Q4"
  });
  const medianPsfFromOneAgo = allRentalPsf?.filter((p) => {
    return p.refPeriod === "2021Q1" || p.refPeriod === "2021Q2" || p.refPeriod === "2021Q3" || p.refPeriod === "2021Q4"
  });
  console.log("Two Years Ago:", medianPsfFromTwoYearsAgo?.length)
  let sumPsfTwoYearsAgo = 0;
  let sumPsfOneYearAgo = 0;
  for (let i = 0; i < medianPsfFromTwoYearsAgo?.length; i++) {
    sumPsfTwoYearsAgo += medianPsfFromTwoYearsAgo[i].median
  }
  for (let i = 0; i < medianPsfFromOneAgo?.length; i++) {
    sumPsfOneYearAgo += medianPsfFromOneAgo[i].median
  }

  // Get the average of the median Psf from rom two years ago (2020) and one year ago (2021)
  const avgPsfTwoYearsAgo = (sumPsfTwoYearsAgo / medianPsfFromTwoYearsAgo?.length).toFixed(2)
  const avgPsfOneYearAgo = (sumPsfOneYearAgo / medianPsfFromOneAgo?.length).toFixed(2)
  const percentageChange = (((avgPsfOneYearAgo - avgPsfTwoYearsAgo)/avgPsfTwoYearsAgo)*100).toFixed(2)
  console.log(percentageChange)
 
  if(loading) {
    return (
      <div>< CircularProgress /></div>
    )
  }

  return (
    
    <Card sx={{ minWidth: 275 }} variant="outlined" style={{marginBottom: "1em", textAlign:"center"}}> 
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
            <Grid item xs={12} md={2}>
              {
                medianPsfFromOneAgo.length !== 0 ?
                (
                  avgPsfOneYearAgo > avgPsfTwoYearsAgo ?
                  (
                  <div>
                    <ArrowDropUpRoundedIcon fontSize="large" color="success"/>
                    <Typography style={{color: "green"}}>{percentageChange}%</Typography>
                  </div>
                  )
                  :
                  (
                  <div>
                    <ArrowDropDownRoundedIcon fontSize="large" color="error"/>
                    <Typography style={{color: "red"}}>{percentageChange}%</Typography>
                  </div>
                  )
                )
                :
                ("-")
              }
            </Grid>
            <Grid item xs={12} md={4}>
              <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                {medianPsfFromTwoYearsAgo.length !== 0 ? 
                (`$${avgPsfTwoYearsAgo}`)
                :
                ("No data available")
                }
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                {medianPsfFromOneAgo.length !== 0 ? 
                (`$${avgPsfOneYearAgo}`)
                :
                ("No data available")
                }
              </div>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WatchlistCard;