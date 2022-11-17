import { useEffect, useState} from "react";
import ProjectDetails from "./ProjectDetails";
import apis from "../../apis/calculator";
import { styled } from "@mui/material/styles";
import { CircularProgress, Box, Paper } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CalculatorIndex = () => {

  const token = "Bearer " + localStorage.getItem("user_token");

  const [calculatorProjects, setCalculatorProjects] = useState();
  const [loading, setLoading] = useState(true);
  const [bsd, setBsd] = useState(0);
  const [absd, setAbsd] = useState(0);
  const [downpayment, setDownpayment] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await apis.getUserCalculators(token);
      setCalculatorProjects(response.data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const allCalculatorProjects = calculatorProjects?.map(p => <ProjectDetails page={"index"} key={p.id} calculatorData={p} setBsd={setBsd} setAbsd={setAbsd} setDownpayment={setDownpayment}/>)
  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress/></div>
    )
  }
  
  return(

    <div className="index">
    <h1>List Of Projects</h1>
    <Box sx={{ flexGrow: 1 }}>
        {allCalculatorProjects}
    </Box>
    </div>
  )
}

export default CalculatorIndex;