import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:8000/api";
const url = `${BASE_URL}/ambulances/`;

export const getAmbulance = async (id) => {
  const res = await axios.get(`${url}${id}`);
  console.log(res);
  return res.data;
};
