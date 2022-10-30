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

const RentalTable = (props) => {

  const [rentalTxn, setRentalTxn] = useState({});
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
      const response = await apis.get2022RentalTxnByProject(props.name);
      setRentalTxn(response)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  let dataFor2022 = []
  for (let i = 0; i < rentalTxn?.length; i++) {
    const newArray = rentalTxn[i].rental
    dataFor2022.push(...newArray);
  }


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
              RENTAL CONTRACTS FOR {props.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Area (sqft)</TableCell>
                <TableCell align="right">Lease Date (MMYY)</TableCell>
                <TableCell align="right">No. Of Bedrooms</TableCell>
                <TableCell align="right">Rent ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {dataFor2022.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.areaSqft}</TableCell>
                <TableCell align="right">{row.leaseDate}</TableCell>
                <TableCell align="right">{row.noOfBedRoom}</TableCell>
                <TableCell align="right">{row.rent}</TableCell>
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

export default RentalTable;
