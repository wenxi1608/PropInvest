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
import apis from "../../apis/watchlist";
import { toast } from "react-toastify";

const WatchlistButton = () => {
  const params = useParams()
  const projectName = params.projectName.replaceAll("-", " ");

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");
  
  const [open, setOpen] = useState(false);
  const [watchlistStatus, setWatchlistStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // To check if project already exists in watchlist, if yes, disable add button
  useEffect(() => {
    const fetchStatus = async() => {
      const response = await apis.getProjectsWatchedByUser(token)
      console.log(response)
      setWatchlistStatus(response.data)
      setLoading(false);
    }

    fetchStatus()
  }, [token]);

  console.log("Watchlist:", watchlistStatus)

  let status = ""
  if(watchlistStatus) {
    status = watchlistStatus?.find(p => {
      return p === projectName
    })
  }
 
  // Handle dialog messages to inform user that they need to be logged in to add to watchlist/calculator
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // To add project to watchlist when user clicks on add button
  const handleSubmit = async(e) => {
    
    try {
      const response = await apis.addToWatchlist(projectName, token)
      if(response.data.error) {
        toast.error(response.data.error)
      } else {
        toast.success(`${projectName} ADDED TO WATCHLIST`);
      }
    } catch (err) {
      toast.error("Unable to add to watchlist")
      console.log(err)
    }
  }

  if(loading) {
    return (
      <div>< CircularProgress/></div>
    )
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
        <div>
        {
        status? 
        (
          <Button variant="contained" disabled>
            <AddRoundedIcon />
            Add to Watchlist
          </Button>
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
    </div>
  )
}

export default WatchlistButton;