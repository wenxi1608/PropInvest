import { useState } from "react";
import Section from "./Section";
import { Container, Button, Grid, Chip, Stack } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import styles from "./Watchlist.scss"

const Watchlist = () => {

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  // Edit button to show delete component
  const [edit, setEdit] = useState(false);
  const handleEdit = (event) => {
    setEdit(current => !current)
  }

  // Allow user to toggle between either rent or sale data to display
  const [dataType, setDataType] = useState("Rent");
  const handleClickOnRent = async() => {
    setDataType("Rent");
  };
  const handleClickOnSale = async() => {
    setDataType("Sale");
  };

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
          <Grid item xs={2} sx={{marginTop: "3em", textAlign: "right"}}>
            <Button color="inherit" sx={{color: "white", backgroundColor: "rgb(173, 102, 131)"}} variant="outlined" startIcon={<EditRoundedIcon/>} onClick={handleEdit}>Edit</Button>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Stack direction="row" spacing={1}>
          <Chip label="Rent Psf" style={{backgroundColor: "white", color: "purple", border: "1px solid purple"}} variant="filled" color="secondary" onClick={handleClickOnRent} />
          <Chip label="Sale Psf" style={{backgroundColor: "white", color: "purple", border: "1px solid purple"}} variant="outlined" color="secondary" onClick={handleClickOnSale} />
        </Stack>
      </Container>
      <div className="watchlist-table">
        <Section token={token} edit={edit} dataType={dataType} />
      </div>
      {/* <Section token={token} edit={edit} dataType={dataType} handleDelete={handleDelete} setProjectToDelete={setProjectToDelete} projectToDelete={projectToDelete} /> */}
      </div>
      )
      :
      ("You must be logged in")
      }
    </div>
  )
 }

 export default Watchlist;