import React, { useState, useEffect } from "react";
import IncomeExpenseTable from "./IncomeExpenseTable";
import { FormLabel, Select, MenuItem, Grid, Button, Box, TextField, Paper, Table, TableBody, TableContainer } from '@mui/material';

const IncomeExpenseForm = (props) => {
  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const [open, setOpen] = useState(false);
  const [editItems, setEditItems] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allItemsInList = props.itemList?.map(item => <IncomeExpenseTable key={item.id} item={item} token={token} itemList={props.itemList} setItemList={props.setItemList}/>);

  return(
    <div className="income-expense-form">
      <Box component="form">
        <FormLabel>Type</FormLabel>
        <Select name="type" onChange={props.handleCreateChange} fullWidth required sx={{minWidth: "150px", margin: "10px"}}>
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
        <FormLabel>Date</FormLabel>
          <TextField name="date" type="date" onChange={props.handleCreateChange} fullWidth required sx={{minWidth: "100px", margin: "10px"}}/>
        <FormLabel>Details</FormLabel>
          <TextField name="details" type="text" onChange={props.handleCreateChange} fullWidth required sx={{minWidth: "200px", margin: "10px"}}/>
        <FormLabel>Amount ($)</FormLabel>
          <TextField name="amount" type="number" onChange={props.handleCreateChange} fullWidth required sx={{minWidth: "100px", margin: "10px"}}/>
        <FormLabel>Category</FormLabel>
          <Select name="category" onChange={props.handleCreateChange} fullWidth required sx={{minWidth: "100px", margin: "10px"}}>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Property Tax">Property Tax</MenuItem>
            <MenuItem value="Maintenance Fees">Maintenance Fees</MenuItem>
            <MenuItem value="Management Fee">Management Fee</MenuItem>
            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
          </Select>
          <Button variant="outlined" onClick={props.handleCreate}>Add Item</Button>
      </Box>
      <Grid direction="row" container style={{margin: "1em", textAlign: "center", maxWidth: "90%"}}>
        <TableContainer direction="row" component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            {/* <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Item Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Amount ($)</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow> */}
          <TableBody>
            {allItemsInList}
          </TableBody>
        </Table>
        </TableContainer>
      </Grid>
    </div>
  )

}

export default IncomeExpenseForm;