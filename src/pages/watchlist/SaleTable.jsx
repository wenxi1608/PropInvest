import React, { useEffect, useState } from "react";
import apis from "../../apis/projects";
import CloseIcon from "@mui/icons-material/Close";
import { Paper, Slide, Typography, IconButton, AppBar, Toolbar, Dialog, Button, CircularProgress, Table, TableHead, TableRow, TableBody, TableCell, TableContainer } from "@mui/material";

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

  const dataFor2022 = saleTxn2022[0]?.transaction;

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
        <AppBar sx={{ position: 'relative', background: "rgb(148,102,148)" }}>
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
