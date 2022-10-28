import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { DateTime } from "luxon";

const Auth = (props) => {
  const token = localStorage.getItem("user_token")

  if(!token) {
    return (
      <Navigate to={"/login"} />
    )
  }

  const user = jwt_decode(token)
  const now = DateTime.now().toUnixInteger()

  if(user.exp < now) {
    localStorage.removeItem("user_token")
    return(
      <Navigate to={"/login"} />
    )
  }

  return(
    <props.component></props.component>
  )

}

export default Auth;