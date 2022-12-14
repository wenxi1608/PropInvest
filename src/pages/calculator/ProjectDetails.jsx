import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Card, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const ProjectDetails = (props) => {

  const data = props.calculatorData

  // Calculate BSD
  let buyersStampDuty = 0
  if(data.residency === "Singaporean" && data.propertiesOwned === 0) {
    if(data.propertyValue > 1000000) {
      buyersStampDuty = ((1800 + 3600 + 19200) + ((data.propertyValue - 1000000)*0.04))
      props.setAbsd(buyersStampDuty)
    } else {
      buyersStampDuty = ((data.propertyValue * 0.03) - 5400)
      props.setAbsd(buyersStampDuty)
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

  // Calculate downpayment
  const downpayment = data.propertyValue - ((data.loanAmount/100) * data.propertyValue)

  props.setAbsd(buyersStampDuty)
  props.setBsd(addBuyersStampDuty)
  props.setDownpayment(downpayment)

  return (
    <div>
    <Grid container direction="row" alignItems="center" width="50em">
      <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 500 }}>
          {props.page === "index"?
          (
            <Link to={`/calculator/${data.projectName}`} style={{textDecoration: "none"}}>
            {data.projectName}
            </Link>
            )
          :
          ("")
          }
        <TableContainer component={Paper} sx={{border: "2px solid purple"}}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>Property Value</TableCell>
                <TableCell>${data.propertyValue.toLocaleString("en-US")}</TableCell>
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
                <TableCell>${buyersStampDuty.toLocaleString("en-US")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Additional Buyer's Stamp Duty</TableCell>
                <TableCell>${addBuyersStampDuty.toLocaleString("en-US")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </Card>
      </Grid>
    </Grid>
  </div>
  );
}

export default ProjectDetails;
