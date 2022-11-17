import { useState, useEffect } from "react";
import apisCalculator from "../../apis/calculator";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";

const CalculatorButton = (props) => {
  
  const [open, setOpen] = useState(false);
  const [calculatorStatus, setCalculatorStatus] = useState();

  // Check if a calculator has already been created for this project
  useEffect(() => {
    const fetchProjects = async() => {
      const response = await apisCalculator.getUserCalculators(props.token);
      setCalculatorStatus(response.data);
    }

    fetchProjects()
  }, [])

  const calculatorExists = calculatorStatus?.filter((p) => {
    return p.projectName === props.projectName
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
        <Button color="inherit" style={{width: "250px", marginBottom: "1em", color: "white", backgroundColor: "rgb(173, 102, 131)"}} variant="contained" onClick={handleClickOpen}>
          <AddRoundedIcon />
          Create Calculator
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
        calculatorExists.length !== 0? 
        (
          <Button style={{width: "250px", marginBottom: "1em"}} variant="contained" disabled startIcon={<DoneRoundedIcon />}>
            Calculator exists
          </Button>
        )
        :
        (
          <Button color="inherit" style={{width: "250px", marginBottom: "1em", color: "white", backgroundColor: "rgb(173, 102, 131)"}} variant="contained" href={`/calculator/create/${props.projectName}`} startIcon={<TableViewRoundedIcon/>}>
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