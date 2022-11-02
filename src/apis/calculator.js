import axios from "axios";

const apis = {
  createCalculator: async (calculatorData, token) => {
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

  getUserCalculators: async (token) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/calculator`,
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
