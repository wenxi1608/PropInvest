import React, { useEffect, useState } from "react";
import apis from "../../apis/projects";
import CloseIcon from "@mui/icons-material/Close";
import { Paper, Slide, Typography, IconButton, AppBar, Toolbar, Dialog, Button, CircularProgress, Table, TableHead, TableRow, TableBody, TableCell, TableContainer } from "@mui/material";

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
      <Button variant="text" sx={{marginTop: "1em"}} onClick={handleClickOpen}>
        View Transactions
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "rgb(148,102,148)" }}>
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
                <TableCell>Lease Date (MMYY)</TableCell>
                <TableCell>Area (sqft)</TableCell>
                <TableCell>No. Of Bedrooms</TableCell>
                <TableCell>Rent ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {dataFor2022.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.leaseDate}</TableCell>
                <TableCell>{row.areaSqft}</TableCell>
                <TableCell>{row.noOfBedRoom}</TableCell>
                <TableCell>{row.rent.toLocaleString()}</TableCell>
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
