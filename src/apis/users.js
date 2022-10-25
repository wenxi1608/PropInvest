import axios from "axios";

const apis = {
  register: async (registration, type) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
      registration,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  },
};

export default apis;
