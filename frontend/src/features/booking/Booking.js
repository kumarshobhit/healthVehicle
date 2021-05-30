import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  user: {},
  ambulance: {},
  userCoordinates: [],
  ambulanceCoordinates: [],
  bookedtime: null,
  status: "pending",
};

const createurl =
  "https://covihelp-india.herokuapp.com/api/bookings/createBooking";
const getDriverBookingURL =
  "https://covihelp-india.herokuapp.com/api/bookings/driver/";
const localgetDriverBookingurl = "http://localhost:8000/api/bookings/driver/";

export const createbooking = createAsyncThunk(
  "booking/createbooking",
  async (
    { user, ambulance, userCoordinates, ambulanceCoordinates },
    { rejectWithValue }
  ) => {
    console.log("reached thunk");
    try {
      const res = await axios.post(createurl, {
        user,
        ambulance,
        userCoordinates,
        ambulanceCoordinates,
        bookedtime: Date.now(),
        status: "pending",
      });
      console.log(res.data);

      return res.data;
    } catch (e) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const getDriverBooking = createAsyncThunk(
  "booking/getBooking",
  async (id, { rejectWithValue }) => {
    console.log("reached thunk");
    try {
      const res = await axios.get(`${getDriverBookingURL}${id}`);
      // const res = await axios.get(
      //   `${localgetDriverBookingurl}60abf2d9ab45d00328e7ce87`
      // );
      if (res.data.response === undefined) {
        return rejectWithValue("Not Found");
      } else {
        console.log(res.data.response);

        return res.data.response;
      }
    } catch (e) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: {
    [createbooking.pending]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        user: {},
        ambulance: {},
        userCoordinates: [],
        ambulanceCoordinates: [],
        bookedtime: null,
        status: "pending",
      });
    },
    [createbooking.fulfilled]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        user: action.payload.booking.user,
        ambulance: action.payload.booking.ambulance,
        userCoordinates: action.payload.booking.userCoordinates,
        ambulanceCoordinates: action.payload.booking.ambulanceCoordinates,
        bookedtime: action.payload.booking.bookedtime,
        status: "booked",
      });
    },
    [createbooking.rejected]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        user: {},
        ambulance: {},
        userCoordinates: [],
        ambulanceCoordinates: [],
        bookedtime: null,
        status: "pending",
      });
    },
    [getDriverBooking.pending]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        user: {},
        ambulance: {},
        userCoordinates: [],
        ambulanceCoordinates: [],
        bookedtime: null,
        status: "pending",
      });
    },
    [getDriverBooking.fulfilled]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        user: action.payload.booking.user,
        ambulance: action.payload.booking.ambulance,
        userCoordinates: action.payload.booking.userCoordinates,
        ambulanceCoordinates: action.payload.booking.ambulanceCoordinates,
        bookedtime: action.payload.booking.bookedtime,
        status: "booked",
      });
    },
    [getDriverBooking.rejected]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        user: {},
        ambulance: {},
        userCoordinates: [],
        ambulanceCoordinates: [],
        bookedtime: null,
        status: "pending",
      });
    },
  },
});

export default bookingSlice.reducer;
export const getUserCoordinates = (state) => state.booking.userCoordinates;
export const ambulanceCoordinates = (state) =>
  state.booking.ambulanceCoordinates;
export const getBookingStatus = (state) => state.booking.status;
export const getAmbulance = (state) => state.booking.ambulance;
export const getUser = (state) => state.booking.user;
export const getBookedtime = (state) => state.booking.bookedtime;
