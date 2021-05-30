import React, { useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import LocationServiceApi from "../api/LocationService";
import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import { getDriverId } from "../features/authentication/driverAuth";
import { useSelector } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import {
  getDriverBooking,
  getUserCoordinates,
  ambulanceCoordinates,
  getBookingStatus,
  getAmbulance,
  getUser,
  getBookedtime,
} from "../features/booking/Booking";
import { useDispatch } from "react-redux";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// @ts-ignore
// eslint-disable-next-line  import/no-webpack-loader-syntax
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const useStyles = makeStyles({
  root: {
    marginTop: "75px",
  },
  navStyle: {
    position: "absolute",
    top: 36,
    left: 0,
    padding: "10px",
  },
  fullscreenControlStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
  },
  details: {
    fontFamily: "Work Sans, sans-serif",
    fontSize: "20px",
  },
  container: {
    marginTop: "40px",
    backgroundColor: "white",
    padding: "40px",
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "15px",
    color: "rgb(0,51,102)",
    alignItems: "flex-start",
    maxWidth: "50vw",
    marginBottom: "40px",
    marginLeft: "300px",
  },
});
function DriverDashBoard() {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const classes = useStyles();
  const driverID = useSelector(getDriverId);
  const [showBooking, setShowBooking] = useState(false);
  //   const intialCoordinates = useState([]);
  //   const finalCoordinates = useState([]);
  //   const status = useSelector(getBookingStatus);
  const intialCoordinates = useSelector(getUserCoordinates);
  const finalCoordinates = useSelector(ambulanceCoordinates);
  const status = useSelector(getBookingStatus);
  const ambulance = useSelector(getAmbulance);
  const user = useSelector(getUser);
  const bookingTime = useSelector(getBookedtime);

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v10",
        center: [-73.985664, 40.748514],
        zoom: 12,
      });

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
      });
      map.on("load", function () {
        // directions.setOrigin([77.0878, 28.6219]);
        // directions.setDestination([77.0929, 28.6691]);
        directions.setOrigin(intialCoordinates);
        directions.setDestination(finalCoordinates);
      });

      map.addControl(directions, "top-left");
    };

    const getBookings = async (id) => {
      const res = await dispatch(getDriverBooking(id));
      if (res.type === "booking/getBooking/fulfilled") {
        setShowBooking(true, initializeMap());
      }
    };

    getBookings(driverID);
  }, []);

  return (
    <div className={classes.root}>
      {showBooking ? (
        <Grid
          className={classes.container}
          direction="column"
          container
          justify="center"
          alignItems="center"
        >
          <Typography className={classes.details} variant="h5" gutterBottom>
            <strong> Name</strong> :{user.firstname}
          </Typography>
          <Typography className={classes.details} variant="h5" gutterBottom>
            <strong> Booked Time</strong> :{bookingTime}
          </Typography>
        </Grid>
      ) : (
        <Grid container justify="center" alignItems="center">
          <Typography
            className={classes.details}
            style={{ marginTop: "200px" }}
            variant="h3"
            gutterBottom
          >
            <strong> Currently not any Bookings for You.</strong>
          </Typography>
        </Grid>
      )}

      <div
        style={{ width: "100%", height: "600px" }}
        ref={mapRef}
        className="mapWrapper"
      ></div>
    </div>
  );
}

export default DriverDashBoard;
