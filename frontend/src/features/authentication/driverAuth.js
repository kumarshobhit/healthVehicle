import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  numberplate: "",
  driversName: "",
  contact: null,
  address: "",
  available: false,
  password: "",
  id: null,
  usertype: "",
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

const loginURL = `${BASE_URL}/ambulances/login`;
const registerURL = `${BASE_URL}/ambulances/register`;

export const signup = createAsyncThunk(
  "driverAuth/signup",
  async (
    { numberplate, driversName, contact, address, available, password },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(registerURL, {
        numberplate,
        driversName,
        contact,
        address,
        available,
        password,
      });
      console.log(res.data.response);
      localStorage.setItem("token", res.data.response.ambulance.token);
      return res.data.response;
    } catch (e) {
      console.log(e.response);
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const login = createAsyncThunk(
  "driverAuth/login",
  async ({ numberplate, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(loginURL, {
        numberplate,
        password,
      });
      console.log(res.data.response);
      localStorage.setItem("token", res.data.response.ambulance.token);
      return res.data.response;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const driverAuthSlice = createSlice({
  name: "driverAuth",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        numberplate: "",
        driversName: "",
        contact: null,
        address: "",
        available: false,
        password: "",
        id: null,
        usertype: "",
      });
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        numberplate: "",
        driversName: "",
        contact: null,
        address: "",
        available: false,
        password: "",
        id: null,
        usertype: "",
      });
    },
    [login.fulfilled]: (state, action) => {
      const ambulance = action.payload.ambulance;
      Object.assign(state, {
        loading: false,
        error: null,
        numberplate: ambulance.numberplate,
        driversName: ambulance.driversName,
        contact: ambulance.contact,
        address: ambulance.address,
        available: ambulance.available,
        password: ambulance.password,
        id: ambulance._id,
        usertype: "driver",
      });
    },
    [login.rejected]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        numberplate: "",
        driversName: "",
        contact: null,
        address: "",
        available: false,
        password: "",
        id: null,
        usertype: "",
      });
    },
    [signup.pending]: (state, action) => {
      Object.assign(state, {
        loading: true,
        error: null,
        numberplate: "",
        driversName: "",
        contact: null,
        address: "",
        available: false,
        password: "",
        id: null,
        usertype: "",
      });
    },
    [signup.fulfilled]: (state, action) => {
      const ambulance = action.payload.ambulance;
      Object.assign(state, {
        loading: false,
        error: null,
        numberplate: ambulance.numberplate,
        driversName: ambulance.driversName,
        contact: ambulance.contact,
        address: ambulance.address,
        available: ambulance.available,
        password: ambulance.password,
        id: ambulance._id,
        usertype: "driver",
      });
    },
    [signup.rejected]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: null,
        numberplate: "",
        driversName: "",
        contact: null,
        address: "",
        available: false,
        password: "",
        id: null,
        usertype: "",
      });
    },
  },
});

export default driverAuthSlice.reducer;
export const isUserLoggedIn = (state) => state.driverAuth.isLoggedIn;
export const getName = (state) => state.driverAuth.driversName;
export const getEmail = (state) => state.driverAuth.email;
export const { logoutUser } = driverAuthSlice.actions;
export const getUserType = (state) => state.driverAuth.usertype;
