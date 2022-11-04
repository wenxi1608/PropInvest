import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom"
import ProjectByDistrict from "./ProjectByDistrict"
import { textAlign } from '@mui/system';

const Filter = (props) => {

// Get the unique list of the districts

  return (
    <Box sx={{ minWidth: 120 }} style={{marginLeft: "2em"}}>
      <FormControl fullWidth>
      <InputLabel id="district">Search by district...</InputLabel>
        <Select style={{ width: "300px", backgroundColor: "white"}}
        variant="outlined"
        displayEmpty={true}
          value={props.districtFilter}
          label="District"
          onChange={props.handleChange}
        >
          {props.districts.map(d => (
            <MenuItem key={d} value={d} as={Link} to={`/projects/district/${d}`}>{`District ${d}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    
  );
}

export default Filter;
