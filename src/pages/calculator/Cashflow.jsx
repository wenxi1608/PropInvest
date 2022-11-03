import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const Cashflow = (props) => {
  console.log(props.bsd, props.absd, props.downpayment, props.itemList)

  // Calculate cash outflow (BSD + ABSD + downpayment + expenses)
  const expenseItems = props.itemList.filter((item) => {
    return item.type === "Expense"
  })
  const expenses = expenseItems.map((item)=> {
    return item.amount
  })
  const expenseSum = expenseItems.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
  const cashOutflow = props.bsd + props.absd + props.downpayment + expenseSum
  console.log("total:", cashOutflow)

  return(
    <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 500 }}>
          <Grid container>
            <Grid item>
              <Typography variant="h6">Cash Outflow To Date</Typography>
              <Typography variant="h6">${cashOutflow}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography variant="h6">Cash Inflow To Date</Typography>
              <Typography variant="h6">$xxx</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
  )
}

export default Cashflow;