import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const Cashflow = (props) => {
  
  // Calculate cash outflow (BSD + ABSD + downpayment + expenses)
  const expenseItems = props.itemList.filter((item) => {
    return item.type === "Expense"
  })
  const expenseSum = expenseItems.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
  const cashOutflow = props.bsd + props.absd + props.downpayment + expenseSum

  // Calculate the cash inflow
  const incomeItems = props.itemList.filter((item) => {
    return item.type === "Income"
  })
  const cashInflow = incomeItems.reduce((total, income) => {
    return total + income.amount;
  }, 0);

  return(
    <Box sx={{marginBottom: "2em", color: "rgb(210, 142, 157)"}}>
      <Typography variant="h6">Cash Outflow To Date</Typography>
      <Typography variant="h3">- ${cashOutflow.toLocaleString("en-US")}</Typography>
      <Typography variant="h6">Cash Inflow To Date</Typography>
      <Typography variant="h3">+ ${cashInflow.toLocaleString("en-US")}</Typography>
    </Box>
  )
}

export default Cashflow;