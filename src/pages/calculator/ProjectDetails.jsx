import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ProjectDetails = (props) => {

  const data = props.calculatorData

  // Calculate BSD
  let buyersStampDuty = 0
  if(data.residency === "Singaporean" && data.propertiesOwned === 0) {
    if(data.propertyValue > 1000000) {
      buyersStampDuty = ((1800 + 3600 + 19200) + ((data.propertyValue - 1000000)*0.04))
    } else {
      buyersStampDuty = ((data.propertyValue * 0.03) - 5400)
    }
  }

  // Calculate ABSD
  let addBuyersStampDuty = 0
  
  if(data.residency === "Singaporean" && data.propertiesOwned === 1) {
    addBuyersStampDuty = data.propertyValue * 0.17
  } else {
    addBuyersStampDuty = data.propertyValue * 0.25
  }
  if(data.residency === "PR" && data.propertiesOwned === 0) {
    addBuyersStampDuty = data.propertyValue * 0.05
  } else if(data.residency === "PR" && data.propertiesOwned === 1) {
    addBuyersStampDuty = data.propertyValue * 0.25
  } else {
    addBuyersStampDuty = data.propertyValue * 0.3
  }
  if(data.residency === "Foreigner") {
    addBuyersStampDuty = data.propertyValue * 0.3
  }

  return (
    <div>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 500 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>Property Value</TableCell>
                <TableCell>${data.propertyValue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Loan Amount</TableCell>
                <TableCell>{data.loanAmount}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Loan Tenure</TableCell>
                <TableCell>{data.loanTenure} Years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Interest Rate</TableCell>
                <TableCell>{data.interestRate}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Buyer's Stamp Duty</TableCell>
                <TableCell>${buyersStampDuty}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Additional Buyer's Stamp Duty</TableCell>
                <TableCell>${addBuyersStampDuty}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 500 }}>
          <Grid container>
            <Grid item>
              <Typography variant="h3">Cash Outflow To Date</Typography>
              <Typography variant="h3">$xxx</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography variant="h3">Cash Inflow To Date</Typography>
              <Typography variant="h3">$xxx</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  </div>
  );
}

export default ProjectDetails;
