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
import RentalTable from './RentalTable';

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
  const [rentalTxn2022, setRentalTxn2022] = useState({})
  
  const getProject = [props.results];
  const projectUrl = getProject.toString().replaceAll(" ", "-");
  
  useEffect(() => {
    const fetchProjects = async() => {
      const rentalDataResponse = await apis.getRentalPsfByProject(getProject[0]);
      const rentalTxnFor2022 = await apis.get2022RentalTxnByProject(getProject[0])
      setRentalData(rentalDataResponse)
      setRentalTxn2022(rentalTxnFor2022)
      setLoading(false)
    }
    fetchProjects()
  }, [])
  
  const allRentalPsf = rentalData[0]?.rentalMedian
  
  // Get the data from two years ago (2020) and one year ago (2021)
  const medianPsf2020 = allRentalPsf?.filter((p) => {
    return p.refPeriod.startsWith("2020")
    // return p.refPeriod === "2020Q1" || p.refPeriod === "2020Q2" || p.refPeriod === "2020Q3" || p.refPeriod === "2020Q4"
  });
  const medianPsf2021 = allRentalPsf?.filter((p) => {
    return p.refPeriod.startsWith("2021")
    // return p.refPeriod === "2021Q1" || p.refPeriod === "2021Q2" || p.refPeriod === "2021Q3" || p.refPeriod === "2021Q4"
  });
  const medianPsf2022 = allRentalPsf?.filter((p) => {
    return p.refPeriod.startsWith("2022")
    // return p.refPeriod === "2022Q1" || p.refPeriod === "2022Q2" || p.refPeriod === "2022Q3" || p.refPeriod === "2022Q4"
  });
  let sumPsf2020 = 0;
  let sumPsf2021 = 0;
  let sumPsf2022 = 0;
  for (let i = 0; i < medianPsf2020?.length; i++) {
    sumPsf2020 += medianPsf2020[i].median
  }
  for (let i = 0; i < medianPsf2021?.length; i++) {
    sumPsf2021 += medianPsf2021[i].median
  }
  for (let i = 0; i < medianPsf2022?.length; i++) {
    sumPsf2022 += medianPsf2022[i].median
  }
  
  // Get the average of the median Psf from 2022, 2021 and 2020
  const avgPsf2020 = (sumPsf2020 / medianPsf2020?.length).toFixed(2)
  const avgPsf2021 = (sumPsf2021 / medianPsf2021?.length).toFixed(2)
  const avgPsf2022 = (sumPsf2022 / medianPsf2022?.length).toFixed(2)
  const percentageChange = (((avgPsf2022 - avgPsf2021)/avgPsf2021)*100).toFixed(2)
 
  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress /></div>
    )
  }

  return (
    
    <Card sx={{ minWidth: 275 }} variant="outlined" style={{marginBottom: "1em", textAlign:"center"}}> 
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={2} md={2}>
              <Link to={`/projects/${projectUrl}`} style={{textDecoration: "none"}}>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                {getProject}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={3} md={3}>
              {
                medianPsf2022.length !== 0 || medianPsf2021.length !== 0 ?
                  (
                    avgPsf2022 > avgPsf2021 ?
                    (
                    <div>
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item><ArrowDropUpRoundedIcon fontSize="large" color="success"/></Grid>
                        <Grid item><Typography style={{color: "green"}}>{percentageChange}%</Typography></Grid>
                      </Grid>
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
            <Grid item xs={2} md={2}>
              <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                {medianPsf2022.length !== 0 ? 
                (`$${avgPsf2022}`)
                :
                ("No data available")
                }
              </div>
            </Grid>
            <Grid item xs={2} md={2}>
              <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                {medianPsf2021.length !== 0 ? 
                (`$${avgPsf2021}`)
                :
                ("No data available")
                }
              </div>
            </Grid>
            <Grid item xs={2} md={2}>
              <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                {medianPsf2020.length !== 0 ? 
                (`$${avgPsf2020}`)
                :
                ("No data available")
                }
              </div>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="flex-end" >
            <RentalTable name={getProject[0]} data={rentalTxn2022}/>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WatchlistCard;