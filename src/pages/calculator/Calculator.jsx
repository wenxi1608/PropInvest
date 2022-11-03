import ProjectDetails from "./ProjectDetails";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import apis from "../../apis/calculator"
import { CircularProgress } from "@mui/material";
import IncomeExpenseForm from "./IncomeExpenseForm";

const Calculator = () => {

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const params = useParams()
  const projectName = params.projectName.replaceAll("-", " ");

  const [calculatorProjects, setCalculatorProjects] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await apis.getUserCalculators(token);
      setCalculatorProjects(response.data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const calculatorData = calculatorProjects?.filter((p) => {
    return p.projectName == "TURQUOISE"
  })

  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress/></div>
    )
  }

  return(
    <div>
      <h1>{projectName}</h1>
      <ProjectDetails calculatorData={calculatorData[0]}/>
      <IncomeExpenseForm projectName={projectName} token={token}/>
    </div>
  )
}

export default Calculator;