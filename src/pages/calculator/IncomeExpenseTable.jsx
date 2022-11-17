import {useState} from 'react';
import apis from "../../apis/calculator"
import { FormLabel, Select, MenuItem, IconButton, Box, Button, TextField, TableCell, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const IncomeExpenseTable = (props) => {

  const [open, setOpen] = useState(false);
  const [editItems, setEditItems] = useState({})
  const item = props.item;

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

  const handleUpdate = async (e, itemId) => {
    e.preventDefault();
    
    try {
      const response = await apis.updateItems(editItems, itemId, props.token);
      props.setItemList(props.itemList.map((item) => {
        return item.id === response.data.id ?
        {date: response.data.date, 
        type: response.data.type, 
        details: response.data.details, 
        amount: response.data.amount, 
        category: response.data.category,
        id: response.data.id,
        }
        :
        item
      }))
    
    } catch(err) {
      console.log(err.response.data.error)
      return
    }
  };

  const handleDelete = async(itemToDelete) => {
    
    try {
      const response = await apis.deleteItem(itemToDelete, props.token)
      props.setItemList(props.itemList.filter((item) => {
        return item.id !== itemToDelete
        }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='item-list' style={{ color: item.type === "Income" ? 'green' : 'red'}}>
      <TableRow>
        <TableCell style={{color:"inherit", width: "100px", textAlign: "left"}}>{item.date}</TableCell>
        <TableCell style={{color:"inherit", width: "120px", textAlign: "left"}}>{item.type}</TableCell>
        <TableCell style={{color:"inherit", width: "200px", textAlign: "left"}}>{item.category}</TableCell>
        <TableCell style={{color:"inherit", width: "200px", textAlign: "left"}}>{item.details}</TableCell>
        <TableCell style={{color:"inherit", width: "100px", textAlign: "left"}}>{item.amount}</TableCell>
        <TableCell style={{color:"inherit", width: "5px", textAlign: "left"}}>
          <IconButton color="primary" onClick={handleClickOpen} size="small"><EditRoundedIcon /></IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{item.type}: {item.details}</DialogTitle>
            <DialogContent>
            <Box component="form" 
            onSubmit={(e) => {handleUpdate(e, item.id)}}
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
              <TableCell style={{color:"inherit", width: "5px", textAlign: "left"}}>
                <IconButton color="primary" onClick={()=>{handleDelete(item.id)}} size="small"><DeleteRoundedIcon /></IconButton>
              </TableCell>
      </TableRow> 
    </div> 
  );
}

export default IncomeExpenseTable;