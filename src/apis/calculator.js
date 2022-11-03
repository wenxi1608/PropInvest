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

  addIncomeExpense: async (item, projectName, token) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/calculator/add-income-expense`,
      { item, projectName },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  },

  getItems: async (projectName, token) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/calculator/items/${projectName}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  },

  updateItems: async (editItems, item, token) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/calculator/update-income-expense`,
      { editItems, item },
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
