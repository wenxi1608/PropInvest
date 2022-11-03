import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchBar = (props) => {

  const listOfProjects = props.projects?.map((p) => {
    return p.project;
  });
  console.log(listOfProjects)

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
        renderInput={(params) => <TextField  {...params} label="Search projects..." />}
        
      />
    </Search>
  );
}

export default SearchBar; 

