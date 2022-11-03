import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from "react-router-dom";
// import apis from "../../apis/watchlist";
import { toast } from "react-toastify";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';

const CalculatorButton = (props) => {
  
  const [open, setOpen] = useState(false);
  
  // Handle dialog messages to inform user that they need to be logged in to add to watchlist/calculator
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return(
    <div>
      {!props.tokenExists? 
      (
        <div>
        <Button variant="contained" onClick={handleClickOpen}>
          <AddRoundedIcon />
          Add to Watchlist
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add To Watchlist?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You must be logged in to create a cashflow calculator for this project.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button href="/login">
              Sign in
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      )
      :
      (
        <div>
        {
        props.calculatorStatus? 
        (
          <Button variant="contained" disabled startIcon={<DoneRoundedIcon />}>
            Calculator exists
          </Button>
        )
        :
        (
          <Button variant="contained" href={`/calculator/create/${props.projectName}`} startIcon={<TableViewRoundedIcon/>}>
              Create Calculator
          </Button>
        )  
        }
        </div>
      )
      }
    </div>
  )
}

export default CalculatorButton;