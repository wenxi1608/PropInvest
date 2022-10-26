import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import mainImage from "../../assets/index/4065113.jpg"
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded';

const Index = () => {
  return(
    <div className="index">

      <Grid container>
        <Grid item xs={12} md={7}>
          <div className="content-wrapper">
            <h1>Track your property investments</h1>
            <p>The one stop platform for property investors to analyse sale prices and rental rates across Singapore</p>
            <Button variant="contained" href="/register">Sign Up</Button>
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className="image-wrapper">
            <img src={mainImage} alt="index-page-main-image" height={300}></img>
          </div>
          </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <TravelExploreRoundedIcon />
        </Grid>
        <Grid item>
          <div className="search">
            <h3>Search properties</h3>
            <p>View the detailed historical transactions of thousands of projects across Singapore</p>
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <AutoGraphRoundedIcon />
        </Grid>
        <Grid item>
          <div className="watchlist">
            <h3>Track the price movement</h3>
            <p>Create a watchlist of properties for comparison to see how your investment is performing</p>
            </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <PriceChangeRoundedIcon />
        </Grid>
        <Grid item>
          <div className="watchlist">
            <h3>Monitor the cashflow of your properties</h3>
            <p>Tool for investors to track the cash inflow and outflow on your property to date</p>
            </div>
        </Grid>
      </Grid>
       
  </div>
  )
}

export default Index;



