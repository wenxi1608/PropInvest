import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const Cashflow = (props) => {
  console.log(props.bsd, props.absd, props.downpayment, props.itemList)

  // Calculate cash outflow (BSD + ABSD + downpayment + expenses)
  const expenseItems = props.itemList.filter((item) => {
    return item.type === "Expense"
  })
  const expenseSum = expenseItems.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
  const cashOutflow = props.bsd + props.absd + props.downpayment + expenseSum
  console.log("total:", cashOutflow)

  // Calculate the cash inflow
  const incomeItems = props.itemList.filter((item) => {
    return item.type === "Income"
  })
  const cashInflow = incomeItems.reduce((total, income) => {
    return total + income.amount;
  }, 0);

  return(
    <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 500 }}>
          <Grid container>
            <Grid item>
              <Typography variant="h6">Cash Outflow To Date</Typography>
              <Typography variant="h6">${cashOutflow.toLocaleString("en-US")}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography variant="h6">Cash Inflow To Date</Typography>
              <Typography variant="h6">${cashInflow.toLocaleString("en-US")}</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
  )
}

export default Cashflow;