import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import apis from "../../apis/watchlist";

const DeleteButton = (props) => {

  return(
    <IconButton aria-label="delete" onClick={() => props.deleteFunction()}>
      <DeleteIcon />
    </IconButton>
  )
}

export default DeleteButton;
