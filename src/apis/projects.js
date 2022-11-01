import axios from "axios";

const apis = {
  getAllProjects: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/projects/median-rental-psf`
    );
    return response.data;
  },

  getProjectDetails: async (projectName) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/project-details`
      );
      const projects = response.data.filter((p) => {
        return p.project === projectName;
      });
      return projects;
    } catch (error) {
      console.log("getProjectDetails Error >>>", error);
    }
  },

  getRentalPsfByProject: async (projectName) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/projects/median-rental-psf`
    );

    const projects = response.data.filter((p) => {
      return p.project === projectName;
    });
    return projects;
  },

  getSalesTxnByProject: async (projectName) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/projects/sale-transactions`
    );

    const projects = response.data.filter((p) => {
      return p.project === projectName;
    });
    return projects;
  },

  get2022RentalTxnByProject: async (projectName) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/projects/rental-transactions-2022`
    );
    const projects = response.data.filter((p) => {
      return p.project === projectName;
    });
    return projects;
  },
};

export default apis;
