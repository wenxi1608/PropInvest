import styles from "./Index.scss"
import SearchBar from "../../components/navbar/SearchBar";
import { Button, Menu, Grid, Container } from "@mui/material";
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded';

const Index = (props) => {

  return(
    <div className="index">
      <Grid container direction="row" className="main">
        <Grid item md={7}>
              <div className="title">
                <h1>Track property transactions, monitor your invesments.</h1>
              </div>
              <div className="tagline">
                <h6>The one stop platform for property investors to analyse sale prices and rental rates across Singapore</h6>
              </div>
              <div className="searchbar">
                <SearchBar projects={props.projects}/>
              </div>
        </Grid>

        <Grid item md={4} className="sub-headers">
          <Grid container direction="row">
            <Grid item>
              <TravelExploreRoundedIcon fontSize="large"/>
            </Grid>
            <Grid item>
              <div className="para">
                <h5>Search properties</h5>
                <h6>View the detailed historical transactions of hundreds of projects across Singapore</h6>
              </div>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item>
              <AutoGraphRoundedIcon fontSize="large"/>
            </Grid>
            <Grid item>
              <div className="para">
                <h5>Track price movement</h5>
                <h6>Create a watchlist of properties for comparison to see how your investment is performing</h6>
              </div>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item>
              <PriceChangeRoundedIcon fontSize="large"/>
            </Grid>
            <Grid item>
              <div className="para">
                <h5>Monitor the cashflow of your properties</h5>
                <h6>Tool for investors to track the cash inflow and outflow on your property to date</h6>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
       
    </div>
  )
}

export default Index;



