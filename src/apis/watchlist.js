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
    console.log("from APIs:", projectName, token);
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

  getProjectsWatchedInDetail: async (token) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/watchlist/watched-projects`,
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
