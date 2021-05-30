import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const url = `${BASE_URL}/ambulances/`;

export const getAmbulance = async (id) => {
  const res = await axios.get(`${url}${id}`);
  console.log(res);
  return res.data;
};
