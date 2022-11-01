import React, { useEffect, useState } from "react";
import apis from "../../apis/watchlist";
import WatchlistCard from "./Card";
import { Container, CircularProgress, Button, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Section from "./Section";
import DeleteButton from "./DeleteButton";

const Watchlist = () => {

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  // Allow user to toggle between either rent or sale data to display
  const [dataType, setDataType] = useState("rent");
  const handleClickOnRent = async() => {
    setDataType("Rent");
  };
  const handleClickOnSale = async() => {
    setDataType("Sale");
  };

  // Edit button to show delete component
  const [edit, setEdit] = useState(false);
  const handleEdit = (event) => {
    setEdit(current => !current)
  }

  return(
    <div>
      {tokenExists? 
      (
      <div>
      <Container>
        <Grid container spacing={{ md: 3}} columns={{ sm: 8, md: 12}}> 
          <Grid item xs={10}>
            <h1>Property Watchlist</h1>
          </Grid>
          <Grid item xs={2} alignContent="center">
            <Button variant="outlined" startIcon={<EditRoundedIcon/>} onClick={handleEdit}>Edit</Button>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Stack direction="row" spacing={1}>
          <Chip label="Rent Psf" variant="outlined" color="primary" onClick={handleClickOnRent} />
          <Chip label="Sale Psf" variant="outlined" color="primary" onClick={handleClickOnSale} />
        </Stack>
      </Container>
      <Section token={token} edit={edit} dataType={dataType}/>
      </div>
      )
      :
      ("You must be logged in")
      }
    </div>
  )
 }

 export default Watchlist;