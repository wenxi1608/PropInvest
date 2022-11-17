import { Typography, Box } from "@mui/material";

const Cashflow = (props) => {
  
  // Calculate cash outflow (BSD + ABSD + downpayment + expenses)
  const expenseItems = props.itemList.filter((item) => {
    return item.type === "Expense"
  })
  const expenseSum = expenseItems.reduce((total, expense) => {
    return total + parseInt(expense.amount);
  }, 0);
  const cashOutflow = props.bsd + props.absd + props.downpayment + expenseSum

  // Calculate cash inflow (all items with Type of "Income")
  const incomeItems = props.itemList.filter((item) => {
    return item.type === "Income"
  })
  const cashInflow = incomeItems.reduce((total, income) => {
    return total + parseInt(income.amount);
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