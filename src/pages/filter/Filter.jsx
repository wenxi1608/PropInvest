import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom"
import ProjectByDistrict from "../project/ProjectByDistrict"

const Filter = (props) => {

// Get the unique list of the districts

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">District</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.districtSelected}
          label="district"
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
