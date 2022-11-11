import { Container, Paper, Typography, TextField, Box, MenuItem, FormLabel, Slider, Select, Button } from '@mui/material';
import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
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

    <div className="creation-form">
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h4" align="center">
            CREATE A NEW CALCULATOR
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
            <FormLabel className="field">Project
              <TextField 
              margin="dense"
                variant="outlined" 
                name="projectName"
                fullWidth
                disabled={true}
                defaultValue={projectName}
                onChange={handleChange}
                />
              </FormLabel>
            <FormLabel className="field">Property Value (S$)
              <TextField 
              margin="dense"
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
            <FormLabel className="field">Properties Owned
              <TextField 
              margin="dense"
                variant="outlined" 
                name="propertiesOwned"
                required
                fullWidth
                placeholder="0"
                type="number"
                onChange={handleChange}
                />
            </FormLabel>
            <FormLabel className="field">Residency
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
            </FormLabel >
              <FormLabel className="field">Loan Amount (%)
              <Slider
              className="slider"
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
            <FormLabel className="field">Loan Tenure (Years)
            <Slider
            className="slider"
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
            <FormLabel className="field">Interest Rate (%)
            <Slider
            className="slider"
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
            color="inherit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white", backgroundColor: "rgb(173, 102, 131)" }}
            >
              Create
            </Button>
           </Box>
        </Paper>
    </Container>
    </div>
  )
}

export default CreationForm;