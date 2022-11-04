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
import SaleTable from './SaleTable';
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
  const [saleTxn2022, setSaleTxn2022] = useState({});
  const [rentalData, setRentalData] = useState({});
  const [saleData, setSaleData] = useState({});

  const getProject = [props.name];
  const projectUrl = getProject.toString().replaceAll(" ", "-");
  
  useEffect(() => {
    const fetchProjects = async() => {
      const rentalDataResponse = await projectApis.getRentalPsfByProject(getProject[0]);
      const saleDataResponse = await projectApis.getSalesTxnByProject(getProject[0]);
      const rentalTxnFor2022 = await projectApis.get2022RentalTxnByProject(getProject[0]);
      const saleTxnFor2022 = await projectApis.getSalesTxnByProject(getProject[0]);
      setRentalData(rentalDataResponse);
      setSaleData(saleDataResponse);
      setRentalTxn2022(rentalTxnFor2022);
      setSaleTxn2022(saleTxnFor2022);
      setLoading(false);
    }
    fetchProjects()
  }, [])
  
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

  // Get the YoY rentChange
  let rentChange = "";
  let rentPercentageChange = "";
  if(sumPsfRent2022 === 0 || sumPsfRent2021 === 0 ) {
    rentChange = "N.A.";
    rentPercentageChange = "N.A.";
  } else {
    rentChange = (avgRentPsf2022 - avgRentPsf2021).toFixed(2)
    rentPercentageChange = ((rentChange/avgRentPsf2021)*100).toFixed(2)
  }
 
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
  const avgSalePsf2020 = ((saleData2020ByPsf?.reduce((a, b) => a + b, 0) / saleData2020ByPsf?.length)).toFixed(2);
  const avgSalePsf2021 = ((saleData2021ByPsf?.reduce((a, b) => a + b, 0) / saleData2021ByPsf?.length)).toFixed(2);
  const avgSalePsf2022 = ((saleData2022ByPsf?.reduce((a, b) => a + b, 0) / saleData2022ByPsf?.length)).toFixed(2);
  const avgSalePsf2020Formatted = Number(avgSalePsf2020).toLocaleString("en-US")
  const avgSalePsf2021Formatted = Number(avgSalePsf2021).toLocaleString("en-US")
  const avgSalePsf2022Formatted = Number(avgSalePsf2022).toLocaleString("en-US")

  // Get the YoY saleChange
  let saleChange = "";
  let salePercentageChange = "";
  if(isNaN(avgSalePsf2022) || isNaN(avgSalePsf2021)) {
    saleChange = "N.A.";
    salePercentageChange = "N.A.";
  } else {
    saleChange = (avgSalePsf2022 - avgSalePsf2021).toFixed(2)
    salePercentageChange = ((saleChange/avgSalePsf2021)*100).toFixed(2)
  }

  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress /></div>
    )
  }

  return (
    <div>
    {props.dataType === "Rent" ?
    (
      <Card sx={{ minWidth: 275 }} variant="outlined" style={{textAlign:"center"}}> 
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={2} md={2}>
                <Link to={`/projects/${projectUrl}`} style={{textDecoration: "none"}}>
                  <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.primary" gutterBottom>
                    {getProject}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={2} md={2}>
                {
                  rentChange === "N.A."?
                  ("-")
                  :
                  (
                        avgRentPsf2022 > avgRentPsf2021 ?
                        (
                        <div>
                          <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item><ArrowDropUpRoundedIcon fontSize="large" color="success"/></Grid>
                            <Grid item><Typography style={{color: "green"}}>${rentChange}</Typography></Grid>
                          </Grid>
                        </div>
                        )
                        :
                        (
                        <div>
                          <ArrowDropDownRoundedIcon fontSize="large" color="error"/>
                          <Typography style={{color: "red"}}>{rentPercentageChange}%</Typography>
                        </div>
                        )
                  )
                } 
              </Grid>
              <Grid item xs={2} md={2}>
                {
                  rentPercentageChange === "N.A."?
                  ("-")
                  :
                    (
                      avgRentPsf2022 > avgRentPsf2021 ?
                      (
                      <div>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                          <Grid item><ArrowDropUpRoundedIcon fontSize="large" color="success"/></Grid>
                          <Grid item><Typography style={{color: "green"}}>{rentPercentageChange === "N.A." ? (`${rentPercentageChange}`):(`${rentPercentageChange}%`)}</Typography></Grid>
                        </Grid>
                      </div>
                      )
                      :
                      (
                      <div>
                        <ArrowDropDownRoundedIcon fontSize="large" color="error"/>
                        <Typography style={{color: "red"}}>{rentPercentageChange}%</Typography>
                      </div>
                      )
                  )
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
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="flex-end">
              <RentalTable name={getProject[0]} data={rentalTxn2022}/>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="flex-end">
              {props.edit === true && <DeleteButton name={getProject[0]} handleDelete={props.handleDelete} projectToDelete={props.projectToDelete} setProjectToDelete={props.setProjectToDelete}/>}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    )
    :
    (
      <Card sx={{ minWidth: 275 }} variant="outlined" style={{textAlign:"center"}}> 
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={2} md={2}>
                <Link to={`/projects/${projectUrl}`} style={{textDecoration: "none"}}>
                  <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.primary" gutterBottom>
                    {getProject}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={2} md={2}>
                {
                  saleChange === "N.A."?
                  ("-")
                  :
                  (
                        avgSalePsf2022 > avgSalePsf2021 ?
                        (
                        <div>
                          <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item><ArrowDropUpRoundedIcon fontSize="large" color="success"/></Grid>
                            <Grid item><Typography style={{color: "green"}}>${saleChange}</Typography></Grid>
                          </Grid>
                        </div>
                        )
                        :
                        (
                        <div>
                          <ArrowDropDownRoundedIcon fontSize="large" color="error"/>
                          <Typography style={{color: "red"}}>{salePercentageChange}%</Typography>
                        </div>
                        )
                  )
                } 
              </Grid>
              <Grid item xs={2} md={2}>
                {
                  salePercentageChange === "N.A."?
                  ("-")
                  :
                    (
                      avgSalePsf2022 > avgSalePsf2021 ?
                      (
                      <div>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                          <Grid item><ArrowDropUpRoundedIcon fontSize="large" color="success"/></Grid>
                          <Grid item><Typography style={{color: "green"}}>{salePercentageChange}%</Typography></Grid>
                        </Grid>
                      </div>
                      )
                      :
                      (
                      <div>
                        <ArrowDropDownRoundedIcon fontSize="large" color="error"/>
                        <Typography style={{color: "red"}}>{salePercentageChange}%</Typography>
                      </div>
                      )
                  )
                }
              </Grid>
              <Grid item xs={2} md={2}>
                <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                  {saleData2022ByPsf ? 
                    (`$${avgSalePsf2022Formatted}`)
                    :
                    ("No data available")
                  }
                </div>
              </Grid>
              <Grid item xs={2} md={2}>
                <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                  {saleData2021ByPsf ? 
                    (`$${avgSalePsf2021Formatted}`)
                    :
                    ("No data available")
                  }
                </div>
              </Grid>
              <Grid item xs={2} md={2}>
                <div style={{backgroundColor: "lightgrey", borderRadius: "5px"}}>
                  {saleData2020ByPsf ? 
                  (`$${avgSalePsf2020Formatted}`)
                  :
                  ("No data available")
                  }
                </div>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="flex-end" >
              <SaleTable name={getProject[0]} data={saleTxn2022}/>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="flex-end">
              {props.edit === true && <DeleteButton handleDelete={props.handleDelete}/>}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    )
    }
    </div>
  );
}

export default WatchlistCard;