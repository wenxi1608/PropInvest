import { Grid } from "@mui/material";

const RentalData = (props) => {

  // 1. Get the past year's rental data for the selected project (i.e. all 4 quarters of 2021)
  let sumPsf = 0
  const medianPsf = props.details[0].rentalMedian
  const pastYrData = medianPsf.filter((p) => {
    return p.refPeriod === "2021Q1" || p.refPeriod === "2021Q2" || p.refPeriod === "2021Q3" || p.refPeriod === "2021Q4"
  })

  for (let i = 0; i < pastYrData.length; i++) {
    sumPsf += pastYrData[i].median
  }
  
  // 2. Get the average of all the project's rental median results
  const avgPsf = (sumPsf / pastYrData.length).toFixed(2)
  
  return(
    <div className="transaction-details">
      <Grid container direction="row">
        <Grid item xs={3}>
          <h2>Average Rental PSF</h2>
        </Grid>
        <Grid item xs={3}>
          <h1>{pastYrData.length !== 0 ? (`$${avgPsf}`) : ("Not available")}</h1> 
        </Grid>
        <Grid item xs={3}>
          <h2>Transaction Volume</h2>
        </Grid>
        <Grid item xs={3}>
          <h1>{pastYrData.length}</h1>
        </Grid>
      </Grid>
      <p>based on past year's transactions</p>
    </div>
  )
}

export default RentalData;