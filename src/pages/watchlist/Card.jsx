import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, {useEffect, useState} from "react"
import projectApis from "../../apis/projects";
import watchlistApis from "../../apis/watchlist";
import { Container, CircularProgress, Button } from "@mui/material";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import RentalTable from './RentalTable';
import DeleteButton from "./DeleteButton";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const WatchlistCard = (props) => {

  const [loading, setLoading] = useState(true);
  const [rentalTxn2022, setRentalTxn2022] = useState({});
  const [rentalData, setRentalData] = useState({});
  const [saleData, setSaleData] = useState({});

  const getProject = [props.results];
  const projectUrl = getProject.toString().replaceAll(" ", "-");
  
  useEffect(() => {
    const fetchProjects = async() => {
      const rentalDataResponse = await projectApis.getRentalPsfByProject(getProject[0]);
      const saleDataResponse = await projectApis.getSalesTxnByProject(getProject[0]);
      const rentalTxnFor2022 = await projectApis.get2022RentalTxnByProject(getProject[0]);
      setRentalData(rentalDataResponse);
      setSaleData(saleDataResponse);
      setRentalTxn2022(rentalTxnFor2022);
      setLoading(false);
    }
    fetchProjects()
  }, [])

  // Remove project from watchlist when user clicks on delete button
  const handleDelete = async() => {
    
    try {
      const response = await watchlistApis.deleteFromWatchlist(getProject, props.token)
      if(response.data.error) {
        toast.error(response.data.error)
      } else {
        toast.success(`${getProject} REMOVED FROM WATCHLIST`);
      }
    } catch (err) {
      toast.error("Unable to remove from watchlist")
      console.log(err)
    }
  }
  
  // RENTAL DATA
  const allRentalPsf = rentalData[0]?.rentalMedian
  
  // Get the data for past 3 years
  const medianRentPsf2020 = allRentalPsf?.filter((p) => {
    return p.refPeriod.startsWith("2020")
    // return p.refPeriod === "2020Q1" || p.refPeriod === "2020Q2" || p.refPeriod === "2020Q3" || p.refPeriod === "2020Q4"
  });
  const medianRentPsf2021 = allRentalPsf?.filter((p) => {
    return p.refPeriod.startsWith("2021")
    // return p.refPeriod === "2021Q1" || p.refPeriod === "2021Q2" || p.refPeriod === "2021Q3" || p.refPeriod === "2021Q4"
  });
  const medianRentPsf2022 = allRentalPsf?.filter((p) => {
    return p.refPeriod.startsWith("2022")
    // return p.refPeriod === "2022Q1" || p.refPeriod === "2022Q2" || p.refPeriod === "2022Q3" || p.refPeriod === "2022Q4"
  });
  let sumPsfRent2020 = 0;
  let sumPsfRent2021 = 0;
  let sumPsfRent2022 = 0;
  for (let i = 0; i < medianRentPsf2020?.length; i++) {
    sumPsfRent2020 += medianRentPsf2020[i].median
  }
  for (let i = 0; i < medianRentPsf2021?.length; i++) {
    sumPsfRent2021 += medianRentPsf2021[i].median
  }
  for (let i = 0; i < medianRentPsf2022?.length; i++) {
    sumPsfRent2022 += medianRentPsf2022[i].median
  }
  
  // Get the average of the median Psf from 2022, 2021 and 2020
  const avgRentPsf2020 = (sumPsfRent2020 / medianRentPsf2020?.length).toFixed(2)
  const avgRentPsf2021 = (sumPsfRent2021 / medianRentPsf2021?.length).toFixed(2)
  const avgRentPsf2022 = (sumPsfRent2022 / medianRentPsf2022?.length).toFixed(2)
  const percentageChange = (((avgRentPsf2022 - avgRentPsf2021)/avgRentPsf2021)*100).toFixed(2)
 
  // SALE DATA
  const allSaleData = saleData[0]?.transaction;

  // Get the data for past 3 years
  const saleData2020 = allSaleData?.filter((p) => {
    return p.contractDate?.endsWith("20")
  });
  const saleData2021 = allSaleData?.filter((p) => {
    return p.contractDate?.endsWith("21")
  });
  const saleData2022 = allSaleData?.filter((p) => {
    return p.contractDate?.endsWith("22")
  });
  const saleData2020ByPsf = saleData2020?.map((p) => {
   return p.price / (p.area * 10.76391042) // convert sqm to sqft
  })
  const saleData2021ByPsf = saleData2021?.map((p) => {
    return p.price / (p.area * 10.76391042) // convert sqm to sqft
   })
   const saleData2022ByPsf = saleData2022?.map((p) => {
    return p.price / (p.area * 10.76391042) // convert sqm to sqft
   })
  const psfSale2020 = (saleData2020ByPsf?.reduce((a, b) => a + b, 0) / saleData2020ByPsf?.length).toFixed(2);
  const psfSale2021 = (saleData2021ByPsf?.reduce((a, b) => a + b, 0) / saleData2021ByPsf?.length).toFixed(2);
  const psfSale2022 = (saleData2022ByPsf?.reduce((a, b) => a + b, 0) / saleData2022ByPsf?.length).toFixed(2);

  console.log("Type:", props.dataType)
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
                medianRentPsf2022.length !== 0 || medianRentPsf2021.length !== 0 ?
                  (
                    avgRentPsf2022 > avgRentPsf2021 ?
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
                {medianRentPsf2022.length !== 0 ? 
                  (`$${avgRentPsf2022}`)
                  :
                  ("No data available")
                }
              </div>
            </Grid>
            <Grid item xs={2} md={2}>
              <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                {medianRentPsf2021.length !== 0 ? 
                  (`$${avgRentPsf2021}`)
                  :
                  ("No data available")
                }
              </div>
            </Grid>
            <Grid item xs={2} md={2}>
              <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                {medianRentPsf2020.length !== 0 ? 
                (`$${avgRentPsf2020}`)
                :
                ("No data available")
                }
              </div>
            </Grid>
            <Grid item xs={1} md={1}>
              {props.edit === true && <DeleteButton deleteFunction={handleDelete}/>}
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