import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { login } from "../features/authentication/driverAuth";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "120px",
    backgroundColor: "white",
    marginBottom: "150px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  subLink: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function DriverLogin() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, setFormState] = useState({
    numberplate: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    const res = await dispatch(login(formState));
    if (res.type === "driverAuth/login/fulfilled") {
      console.log(res.payload);
      setFormState({
        numberplate: "",
        password: "",
      });
      history.push("/");
    } else {
      setErrorMessage(res.payload);
      console.log(res.payload);
    }
    console.log(res);
  };

  return (
    <Container component="main" className={classes.root} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="numberplate"
            label="Number Plate"
            name="numberplate"
            value={formState.numberplate}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onChange={handleChange}
            onClick={handleSubmit}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
}
