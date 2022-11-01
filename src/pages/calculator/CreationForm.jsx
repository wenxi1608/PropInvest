import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { FormLabel } from '@mui/material';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0.0',
  },
  {
    value: 1,
    label: '1.0',
  },
  {
    value: 2,
    label: '2.0',
  },
  {
    value: 3,
    label: '3.0',
  },
  {
    value: 4,
    label: '4.0',
  },
  {
    value: 5,
    label: ' 5.0',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}


const CreationForm = () => {

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  return(

    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create Calculator
          </Typography>
          <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
            <FormLabel>Property Value (S$)
              <TextField 
                variant="outlined" 
                name="value"
                required
                fullWidth
                id="value"
                placeholder="$500,000"
                type="number"
                />
            </FormLabel>
            <FormLabel>Interest Rate (%)
            <Slider
              aria-label="loan tenure"
              getAriaValueText={valuetext}
              step={0.1}
              valueLabelDisplay="auto"
              marks={marks}
              max={5}
              min={0}
            />
            </FormLabel>
           </Box>
          
          
        
        </Paper>
    </Container>

  )
}

export default CreationForm;