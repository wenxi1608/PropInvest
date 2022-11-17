const Overview = (props) => {
  
  return (
  <div>
    <h1>{props.name}</h1>
    <h5>{props.details[0].street}</h5> 
    <h5>District {props.details[0].rental[0].district}</h5>
  </div>
  )
}

export default Overview;