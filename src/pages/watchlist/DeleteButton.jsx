import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import apis from "../../apis/watchlist";

const DeleteButton = (props) => {

  return(
    <Button variant="contained" color="error" startIcon={<DeleteIcon/>} onClick={() => props.handleDelete(props.name)}>
      Delete
    </Button>
  )
}

export default DeleteButton;
