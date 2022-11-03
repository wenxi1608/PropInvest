import React, {useState} from 'react';
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
import { FormLabel, Select, MenuItem } from '@mui/material';
import apis from "../../apis/calculator"

const IncomeExpenseTable = (props) => {

  const [open, setOpen] = useState(false);
  const [editItems, setEditItems] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEditItems({
      ...editItems,
      [e.target.name]: e.target.value,
    });
  };
  console.log(editItems)

  const handleSubmit = async (e, item) => {
    e.preventDefault();
    
    try {
      const response = await apis.updateItems(editItems, item, props.token);
      props.setItemList(props.itemList.map((item) => {
        return item.id === response.data.id ?
        {date: response.data.date, 
        type: response.data.type, 
        details: response.data.details, 
        amount: response.data.amount, 
        category: response.data.category}
        :
        item
      }))
      console.log(response)
      // navigate(`/calculator/${projectName}`);
    } catch(err) {
      console.log(err.response.data.error)
      return
    }
  };

  const item = props.item;
  console.log(item)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Item Type</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Amount ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.date}
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.details}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                <Button variant="outlined" startIcon={<EditRoundedIcon/>} onClick={handleClickOpen}>Edit</Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Edit Item</DialogTitle>
                  <DialogContent>
                  <Box component="form" 
                  onSubmit={(e) => {handleSubmit(e, item)}}
                  sx={{'& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                    <FormLabel>Date
                      <TextField 
                        variant="outlined" 
                        name="date"
                        fullWidth
                        defaultValue={item.date}
                        type="date"
                        onChange={handleChange}
                        />
                      </FormLabel>
                      <FormLabel>Type
                        <Select 
                          variant="outlined" 
                          name="type"
                          fullWidth
                          defaultValue={item.type}
                          onChange={handleChange}
                          >
                          <MenuItem value="Income">Income</MenuItem>
                          <MenuItem value="Expense">Expense</MenuItem>
                          </Select>
                      </FormLabel>
                      <FormLabel>Category
                        <Select 
                          variant="outlined" 
                          name="category"
                          fullWidth
                          defaultValue={item.category}
                          onChange={handleChange}
                          >
                          <MenuItem value="Rent">Rent</MenuItem>
                          <MenuItem value="Property Tax">Property Tax</MenuItem>
                          <MenuItem value="Maintenance Fees">Maintenance Fees</MenuItem>
                          <MenuItem value="Management Fees">Management Fees</MenuItem>
                          <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                        </Select>
                      </FormLabel>
                      <FormLabel>Details
                      <TextField 
                        variant="outlined" 
                        name="details"
                        fullWidth
                        defaultValue={item.details}
                        onChange={handleChange}
                        />
                      </FormLabel>
                      <FormLabel>Amount ($)
                      <TextField 
                        variant="outlined" 
                        name="amount"
                        fullWidth
                        defaultValue={item.amount}
                        type="number"
                        onChange={handleChange}
                        />
                      </FormLabel>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleClose}
                      >
                        Update
                      </Button>
                  </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    
  );
}

export default IncomeExpenseTable;