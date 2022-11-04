import styles from "./ProjectPage.scss";
import { CircularProgress, Grid } from "@mui/material";

const SaleData = (props) => {

  // 1. Get all transactions in 2020
  const pastYrData = props.details[0].transaction.filter((p) => {
    return p.contractDate.endsWith("21") === true
  })
  
  // 2. Obtain an array of the sales psf by dividing the price by area (sqm)
  const pastYrSalesPsf = pastYrData.map((p) => {
    return p.price / (p.area * 10.76391042)
  })

  // 3. Get the average of all project's sales results
  let sumPsf = 0

  for (let i = 0; i < pastYrSalesPsf.length; i++) {
    sumPsf += pastYrSalesPsf[i]
  }
  const avgPsf = (sumPsf / pastYrSalesPsf.length).toFixed(2)
  const formattedAvgPsf = Number(avgPsf).toLocaleString('en-US');

  return(
      <div className="transaction-details">
      <Grid container direction="row">
        <Grid item xs={3}>
          <h2>Average Sale PSF</h2>
        </Grid>
        <Grid item xs={3}>
          <h1>{pastYrSalesPsf.length === 0 ? ("Not available") : (`$${formattedAvgPsf}`)}</h1> 
        </Grid>
        <Grid item xs={3}>
          <h2>Transaction Volume</h2>
        </Grid>
        <Grid item xs={3}>
          <h1>{pastYrSalesPsf.length}</h1>
        </Grid>
      </Grid>
      <p>based on past year's transactions</p>
      </div>
  )
}

export default SaleData;