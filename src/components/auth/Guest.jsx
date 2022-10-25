import { Navigate } from "react-router-dom";

function Guest(props) {
  const token = localStorage.getItem("user_token");
  const user = props.user
  if (token) {
    props.setTokenState(token)
    return <Navigate to={"/"} />;
  }

  // render props.component
  return <props.component setTokenState={props.setTokenState} user={user}></props.component>;
}

export default Guest;
