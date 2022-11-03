import Container from '@mui/material/Container';
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { FormLabel } from '@mui/material';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import apis from '../../apis/calculator';

const interestRate = [
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

const loanTenure = [{value: 5, label: "5"}, {value: 10, label: "10"}, {value: 20, label: "20"}, {value: 30, label: "30"}, {value: 35, label: "35"} ]
const loanAmount = [{value: 35, label: "35"}, {value: 40, label: "40"}, {value: 50, label: "50"}, {value: 60, label: "60"}, {value: 75, label: "75"} ]

function valuetext(value) {
  return `${value}`;
}

// function interestRateValue(value) {
//   return interestRate.findIndex((mark) => mark.value === value) + 1;
// }

// function loanTenureValue(value) {
//   return loanTenure.findIndex((mark) => mark.value === value) + 1;
// }

const CreationForm = () => {

  const params = useParams()
  const projectName = params.projectName.replaceAll("-", " ");

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const navigate = useNavigate()
  const [calculatorData, setCalculatorData] = useState({ projectName: projectName, propertyValue: 0, loanAmount: 0, loanTenure: 0, interestRate: 0})

  const handleChange = (e) => {
    setCalculatorData({
      ...calculatorData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(calculatorData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apis.createCalculator(calculatorData, token);
      toast.success(`CALCULATOR CREATED FOR ${projectName}`)
      navigate(`/calculator/${projectName}`);
    } catch(err) {
      toast.error(err.response.data.error)
      return
    }
  };

  return(

    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create Calculator
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{'& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
            <FormLabel>Project
              <TextField 
                variant="outlined" 
                name="projectName"
                fullWidth
                disabled={true}
                defaultValue={projectName}
                onChange={handleChange}
                />
              </FormLabel>
            <FormLabel>Property Value (S$)
              <TextField 
                variant="outlined" 
                name="propertyValue"
                required
                fullWidth
                id="value"
                placeholder="$500,000"
                type="number"
                onChange={handleChange}
                />
            </FormLabel>
            <FormLabel>Properties Owned
              <TextField 
                variant="outlined" 
                name="propertiesOwned"
                required
                fullWidth
                placeholder="0"
                type="number"
                onChange={handleChange}
                />
            </FormLabel>
            <FormLabel>Residency
            <Select
              fullWidth
              required
              value=""
              name="residency"
              onChange={handleChange}
            >
              <MenuItem value="Singaporean">Singaporean</MenuItem>
              <MenuItem value="PR">PR</MenuItem>
              <MenuItem value="Foreigner">Foreigner</MenuItem>
            </Select>
            </FormLabel>
              <FormLabel>Loan Amount (%)
              <Slider
                name="loanAmount"
                aria-label="loan-amount"
                getAriaValueText={valuetext}
                step={5}
                valueLabelDisplay="auto"
                marks={loanAmount}
                max={75}
                min={35}
                onChange={handleChange}
              />
            </FormLabel>
            <FormLabel>Loan Tenure (Years)
            <Slider
              name="loanTenure"
              aria-label="loan-tenure"
              getAriaValueText={valuetext}
              step={5}
              valueLabelDisplay="auto"
              marks={loanTenure}
              max={35}
              min={5}
              onChange={handleChange}
            />
            </FormLabel>
            <FormLabel>Interest Rate (%)
            <Slider
              name="interestRate"
              aria-label="interest-rate"
              getAriaValueText={valuetext}
              step={0.1}
              valueLabelDisplay="auto"
              marks={interestRate}
              max={5}
              min={0}
              onChange={handleChange}
            />
            </FormLabel>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
           </Box>
          
          
        
        </Paper>
    </Container>

  )
}

export default CreationForm;