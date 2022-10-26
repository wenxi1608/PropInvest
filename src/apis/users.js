import axios from "axios";

const apis = {
  register: async (registrationData, type) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
      registrationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  },

  login: async (loginData, type) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
};

export default apis;
