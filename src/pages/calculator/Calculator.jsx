const Calculator = () => {

  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  return(
    <h1>Calculator</h1>
  )
}

export default Calculator;