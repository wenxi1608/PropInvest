import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const ButtonStatus = (props) => {
  return(
    <div>
        {
        props.inWatchlist? 
        (
          <Button variant="contained" disabled startIcon={<DoneRoundedIcon />}>
            In Watchlist
          </Button>
        )
        :
        (
          // <Button variant="contained" onClick={handleSubmit}>
          <Button variant="contained" onClick={() => props.handleSubmit()}>
            <AddRoundedIcon />
            Add to Watchlist
          </Button>
        )  
        }
        </div>
  )
}

export default ButtonStatus;