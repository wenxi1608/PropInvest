import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {

  const listOfProjects = props.projects.map((p) => {
    return p.project;
  });
  console.log(listOfProjects)

  const navigate = useNavigate();

  return (
    <Autocomplete
      disablePortal
      id="search-bar"
      options={listOfProjects}
      onChange={(e, value) => {
        navigate(`/projects/${value}`);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField  {...params} label="Search projects..." />}
      
    />
  );
}

export default SearchBar; 

