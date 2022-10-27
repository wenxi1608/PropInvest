import React, { useState } from "react";
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from "react-router-dom"
import apis from "../../apis/watchlist"

const WatchlistButton = () => {
  const params = useParams()
  const projectName = params.projectName.replaceAll("-", " ");

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");
  
  const [open, setOpen] = useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(e) => {
    
    try {
      const response = await apis.addToWatchlist(projectName, token)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  
  return(
    <div>
      {!tokenExists? 
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
              You must be logged in to add this project to a watchlist.
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
      <Button variant="contained" onClick={handleSubmit}>
        <AddRoundedIcon />
        Add to Watchlist
      </Button>
      )
      }
    </div>
  )
}

export default WatchlistButton;