import axios from "axios";

const apis = {
  createCalculator: async (calculatorData, token) => {
    console.log("In API:", calculatorData);
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/calculator/create`,
      calculatorData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  },
};

export default apis;
