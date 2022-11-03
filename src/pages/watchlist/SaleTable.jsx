import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import apis from "../../apis/projects"
import CircularProgress from "@mui/material/CircularProgress";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SaleTable = (props) => {

  const [saleTxn2022, setSaleTxn2022] = useState({});
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apis.getSalesTxnByProject(props.name)
      setSaleTxn2022(response)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  console.log(saleTxn2022)
  const dataFor2022 = saleTxn2022[0]?.transaction;

  // console.log(saleTxn2022.length)
  // let test = []
  // if(saleTxn2022.length !== 0) {
  //   test = saleTxn2022[0]?.transaction[0].price
  //   const price = Number(test).toLocaleString("en-US")
  //   console.log("Data 2022 test:", price)
  // }
  

  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress /></div>
    )
  }

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        View Transactions
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              SALE CONTRACTS FOR {props.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date of Sale (MMYY)</TableCell>
                <TableCell>Area (sqm)</TableCell>
                <TableCell>Floor Range</TableCell>
                <TableCell>Type Of Sale</TableCell>
                <TableCell>Sale Price ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {dataFor2022?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.contractDate}</TableCell>
                <TableCell>{row.area}</TableCell>
                <TableCell>{row.floorRange}</TableCell>
                <TableCell>{row.typeOfSale === 1? ("New Sale"):("Resale")}</TableCell>
                <TableCell>{Number(row.price).toLocaleString("en-US")}</TableCell>
              </TableRow>
            ))
            }
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </div>
     
  );
}

export default SaleTable;
