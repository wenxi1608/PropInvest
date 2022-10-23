import styles from "./RentalData.scss"

const SaleData = (props) => {

  // 1. Get all transactions in 2020
  const pastYrData = props.details[0].transaction.filter((p) => {
    return p.contractDate.endsWith("21") === true
  })
  
  // 2. Obtain an array of the sales psf by dividing the price by area (sqm)
  const pastYrSalesPsf = pastYrData.map((p) => {
    return p.price / (p.area * 10.76391042)
  })
  console.log("Sales Psf:", pastYrSalesPsf)

  // 3. Get the average of all project's sales results
  let sumPsf = 0

  for (let i = 0; i < pastYrSalesPsf.length; i++) {
    sumPsf += pastYrSalesPsf[i]
  }
  const avgPsf = (sumPsf / pastYrSalesPsf.length).toFixed(2)
  const formattedAvgPsf = Number(avgPsf).toLocaleString('en-US');

  console.log("avg Sales Psf:", formattedAvgPsf)

  return(
    <div className="data">
    <h1>Average Sale Price PSF: ${formattedAvgPsf}</h1>
    <h1>Transaction Volume: {pastYrSalesPsf.length}</h1>
    <p>based on past year's transactions</p>
  </div>
  )
}

export default SaleData;