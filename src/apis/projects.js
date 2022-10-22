import axios from "axios";

const apis = {
  getAllProjects: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/projects/median-rental-psf`
    );
    return response.data.Result;
  },

  getProjectsByDistrict: async (districtNo) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/projects/median-rental-psf`
    );
    const projects = response.data.Result.filter((p) => {
      return p.rentalMedian[0].district === districtNo;
    });

    return projects;
  },

  getProjectDetails: async (projectName) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/projects/project-details`
    );
    const projects = response.data.filter((p) => {
      return p.project === projectName;
    });
    return projects;
  },

  getRentalPsfByProject: async (projectName) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/projects/median-rental-psf`
    );

    const projects = response.data.Result.filter((p) => {
      return p.project === projectName;
    });
    return projects;
  },
};

export default apis;
