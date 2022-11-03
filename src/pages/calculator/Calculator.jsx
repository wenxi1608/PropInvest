import ProjectDetails from "./ProjectDetails";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import apis from "../../apis/calculator"
import { CircularProgress } from "@mui/material";
import IncomeExpenseForm from "./IncomeExpenseForm";
import Cashflow from "./Cashflow";

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

  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress/></div>
    )
  }

  return(
    <div>
      <h6>CASHFLOW CALCULATOR</h6>
      <h1>{projectName}</h1>
      <ProjectDetails page={"calculator"} calculatorData={calculatorData[0]} setBsd={setBsd} setAbsd={setAbsd} setDownpayment={setDownpayment}/>
      <Cashflow bsd={bsd} absd={absd} downpayment={downpayment} itemList={itemList}/>
      <IncomeExpenseForm projectName={projectName} token={token} setItemList={setItemList} itemList={itemList}/>
    </div>
  )
}

export default Calculator;