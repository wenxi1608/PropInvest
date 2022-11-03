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
import { FormLabel, Select, MenuItem } from '@mui/material';

const IncomeExpenseForm = (props) => {
  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
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

  // Update Item
  const handleUpdateChange = (e) => {
    setEditItems({
      ...editItems,
      [e.target.name]: e.target.value,
    });
  };
  console.log(editItems)

  const handleUpdate = async (e, item) => {
    e.preventDefault();
    
    try {
      const response = await apis.updateItems(editItems, item, props.token);
      console.log(response)
      // navigate(`/calculator/${projectName}`);
    } catch(err) {
      console.log(err.response.data.error)
      return
    }
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

  const allItemsInList = itemList?.map(item => <IncomeExpenseTable key={item} item={item} token={token} itemList={itemList} setItemList={setItemList}/>);
  

  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress/></div>
    )
  }

  return(
    <div className="income-expense-form">
      <label>Type</label>
      <select name="type" onChange={handleCreateChange}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <label>Date</label>
        <input name="date" type="date" onChange={handleCreateChange}/>
      <label>Details</label>
        <input name="details" type="text" onChange={handleCreateChange}/>
      <label>Amount ($)</label>
        <input name="amount" type="number"onChange={handleCreateChange}/>
      <label>Category</label>
        <select name="category" onChange={handleCreateChange}>
          <option value="Rent">Rent</option>
          <option value="Property Tax">Property Tax</option>
          <option value="Maintenance Fees">Maintenance Fees</option>
          <option value="Management Fee">Management Fee</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <button onClick={handleCreate}>Add Item</button>
        {allItemsInList}
    </div>
  )

}

export default IncomeExpenseForm;