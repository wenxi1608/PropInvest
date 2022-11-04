import React, { useState, useEffect } from "react";
import apis from "../../apis/calculator";
import { toast } from 'react-toastify';
import { CircularProgress } from "@mui/material";
import IncomeExpenseTable from "./IncomeExpenseTable";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { FormLabel, Select, MenuItem, Grid } from '@mui/material';

const IncomeExpenseForm = (props) => {
  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const [item, setItem] = useState({});
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editItems, setEditItems] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Form to create new income/expense item
  const handleCreateChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  console.log("item:", item)

  const handleCreate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apis.addIncomeExpense(item, props.projectName, token);
      setItemList([...itemList,
        item
      ])
    } catch(err) {
      toast.error(err.response.data.error)
      return
    }
  };

  // Get income/expense item to display in table
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await apis.getItems(props.projectName, token);
      setItemList(response.data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  console.log(itemList)

  const allItemsInList = itemList?.map(item => <IncomeExpenseTable key={item.id} item={item} token={token} itemList={itemList} setItemList={setItemList}/>);
  
  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress/></div>
    )
  }

  return(
    <div className="income-expense-form">
      <Box component="form">
        <FormLabel>Type</FormLabel>
        <Select name="type" onChange={handleCreateChange} fullWidth required sx={{minWidth: "150px", margin: "10px"}}>
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
        <FormLabel>Date</FormLabel>
          <TextField name="date" type="date" onChange={handleCreateChange} fullWidth required sx={{minWidth: "100px", margin: "10px"}}/>
        <FormLabel>Details</FormLabel>
          <TextField name="details" type="text" onChange={handleCreateChange} fullWidth required sx={{minWidth: "200px", margin: "10px"}}/>
        <FormLabel>Amount ($)</FormLabel>
          <TextField name="amount" type="number"onChange={handleCreateChange} fullWidth required sx={{minWidth: "100px", margin: "10px"}}/>
        <FormLabel>Category</FormLabel>
          <Select name="category" onChange={handleCreateChange} fullWidth required sx={{minWidth: "100px", margin: "10px"}}>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Property Tax">Property Tax</MenuItem>
            <MenuItem value="Maintenance Fees">Maintenance Fees</MenuItem>
            <MenuItem value="Management Fee">Management Fee</MenuItem>
            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
          </Select>
          <Button variant="outlined" onClick={handleCreate}>Add Item</Button>
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