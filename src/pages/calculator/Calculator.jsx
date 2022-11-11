import ProjectDetails from "./ProjectDetails";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import apis from "../../apis/calculator"
import { CircularProgress, Grid, Box } from "@mui/material";
import IncomeExpenseForm from "./IncomeExpenseForm";
import Cashflow from "./Cashflow";
import { toast } from 'react-toastify';

const Calculator = () => {

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const params = useParams()
  const projectName = params.projectName.replaceAll("-", " ");

  const [calculatorProjects, setCalculatorProjects] = useState();
  const [loading, setLoading] = useState(true);

  const [cashOutflow, setCashOutflow] = useState(0);
  const [cashInflow, setCashInflow] = useState(0);
  const [bsd, setBsd] = useState(0);
  const [absd, setAbsd] = useState(0);
  const [downpayment, setDownpayment] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await apis.getUserCalculators(token);
      setCalculatorProjects(response.data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const calculatorData = calculatorProjects?.filter((p) => {
    return p.projectName == projectName
  })

  // Form to create new income/expense item
  const handleCreateChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apis.addIncomeExpense(item, projectName, token);
      setItemList([...itemList,
        item
      ])
    } catch(err) {
      toast.error(err.response.data.error)
      return
    }
  };

  // Get income/expense item to display in table
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await apis.getItems(projectName, token);
      setItemList(response.data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress/></div>
    )
  }

  return(
    <div className="index">
      <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} >
            <h5>CASHFLOW CALCULATOR</h5>
            <h1>{projectName}</h1>
            <Cashflow bsd={bsd} absd={absd} downpayment={downpayment} setItemList={setItemList} itemList={itemList}/>
            <ProjectDetails page={"calculator"} calculatorData={calculatorData[0]} setBsd={setBsd} setAbsd={setAbsd} setDownpayment={setDownpayment}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="income-expense-table">
              <h3>Track your income/expenses using this table</h3>
              <IncomeExpenseForm projectName={projectName} token={token} setItemList={setItemList} itemList={itemList} handleCreate={handleCreate} handleCreateChange={handleCreateChange}/>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Calculator;