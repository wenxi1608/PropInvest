import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  '&:hover': {
    backgroundColor: "white",
  },
  // marginLeft: 0,
  width: 'fit-content',
}));

const SearchBar = (props) => {

  console.log(props.projects)

  const listOfProjects = props.projects?.map((p) => {
    return p.project;
  });

  const navigate = useNavigate();
  
  return (
    <Search>
      <Autocomplete
        disablePortal
        id="search-bar"
        options={listOfProjects}
        onChange={(e, value) => {
          navigate(`/projects/${value}`);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField  {...params} label="Search by project name..." />}
        
      />
    </Search>
  );
}

export default SearchBar; 

