import axios from "axios";

const apis = {
  addToWatchlist: async (projectName, token) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/watchlist/${projectName}`,
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
