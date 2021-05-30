import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import {
  checkDriverAvailable,
  getDrivernumberplate,
  getDriverName,
  getDriverEmail,
  getDrivercontact,
  checkDriver,
} from "../features/authentication/driverAuth";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  details: {
    fontFamily: "Inter",
    // alignSelf: "flex-start",
  },
  profileContainer: {
    padding: "75px",
    maxWidth: "40vw",
    marginTop: "70px",
    boxShadow:
      " 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22)",
    color: "rgb(0,51,102)",
    backgrounfColor: "white",
  },
  detailsHeading: {
    position: "relative",
    bottom: "50px",
    fontFamily: "Playfair Display",
  },
});
function DriverProfile() {
  const classes = useStyles();
  const Name = useSelector(getDriverName);
  const Email = useSelector(getDriverEmail);
  const UserType = useSelector(checkDriver);
  const contact = useSelector(getDrivercontact);
  const available = useSelector(checkDriverAvailable);
  const numberplate = useSelector(getDrivernumberplate);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid
        className={classes.profileContainer}
        container
        direction="column"
        justify="center"
      >
        <Typography
          className={classes.detailsHeading}
          variant="h3"
          gutterBottom
        >
          My Profile
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          <strong> Name </strong> : {Name}
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          <strong> Contact</strong> :{contact}
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          <strong>available</strong> :{available === false ? "false" : "true"}
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          <strong> numberplate</strong> :{numberplate}
        </Typography>
        <Typography className={classes.details} variant="h5" gutterBottom>
          <strong> Account Type </strong> :{UserType}
        </Typography>
        <Button
          style={{ marginTop: "30px" }}
          variant="contained"
          color="primary"
        >
          {available === true ? "Mark Unavailable" : "Mark Available"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default DriverProfile;
