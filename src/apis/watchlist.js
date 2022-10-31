import axios from "axios";

const apis = {
  addToWatchlist: async (projectName, token) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/watchlist/${projectName}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  },

  getProjectsWatchedByUser: async (token) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/watchlist/lists`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  },

  deleteFromWatchlist: async (projectName, token) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/watchlist/delete/${projectName}`,
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
