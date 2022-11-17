import { Link } from "react-router-dom"
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

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
