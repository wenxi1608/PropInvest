import { useState, useEffect } from "react";
import apisWatchlist from "../../apis/watchlist";
import { Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import styles from "./ProjectPage.scss"

const WatchlistButton = (props) => {

  const [open, setOpen] = useState(false);
  const [watchlistStatus, setWatchlistStatus] = useState();

  // Check if project exists in user watchlist
  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apisWatchlist.getProjectsWatchedByUser(props.token);
      setWatchlistStatus(response.data);
    }

    fetchProjects()
  }, [])

  const projectMatch = watchlistStatus?.find((p) => {
    return p === props.projectName
  })
  
  // Handle dialog messages to inform user that they need to be logged in to add to watchlist/calculator
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return(
    <div className="project-page-button">
      {!props.tokenExists? 
      (
        <div>
        <Button color="inherit" style={{width: "250px", marginBottom: "1em", color: "white", backgroundColor: "rgb(173, 102, 131)"}} onClick={handleClickOpen}>
          <AddRoundedIcon/>
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
            <Button color="inherit" href="/login">
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
        projectMatch || props.inWatchlist === true? 
        (
          <Button variant="contained" style={{width: "250px", marginBottom: "1em"}} disabled startIcon={<DoneRoundedIcon />}>
            In Watchlist
          </Button>
        )
        :
        (
          <Button color="inherit" style={{width: "250px", marginBottom: "1em", color: "white", backgroundColor: "rgb(173, 102, 131)"}} variant="contained" onClick={() => props.handleAddToWatchlist()}>
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