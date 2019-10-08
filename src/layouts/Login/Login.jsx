import React from "react";
import { Redirect } from "react-router-dom";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import axios from "axios";

import Notification from "../../components/Notification/Notification.jsx";

const backgroundStyle = {
  backgroundImage:
    "url(https://i.pinimg.com/originals/e0/d6/6a/e0d66a03fdf7fecce02b8b76e141d325.jpg)",
  width: "100%",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "rgba(0,0,0,0.8)",
  backgroundBlendMode: "overlay"
};

const gridStyle = {
  minWidth: 275,
  textAlign: "center",
  position: "absolute",
  maxWidth: 300
};

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  input: {
    color: "white"
  },
  button: {
    color: "white",
    textTransform: "none",
    borderColor: "white"
  },
  menu: {
    width: "100%"
  }
}));

// const types = [
//   {
//     value: "superadmin",
//     label: "Super Admin"
//   },
//   {
//     value: "profileadmin",
//     label: "Profile Admin"
//   },
//   {
//     value: "profileuser",
//     label: "Profile User"
//   }
// ];

export default function Login(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: undefined,
    password: undefined
    // type: "superadmin"
  });

  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const loggedIn = localStorage.getItem("loggedIn");

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  function loggedInfunc(e) {
    e.preventDefault();
    if (values.email.length === 0 || values.email === undefined) {
      setNotification("Enter valid Email");
      setOpen(true);
    } else if (values.password.length === 0 || values.password === undefined) {
      setNotification("Enter Password");
      setOpen(true);
    } else {
      axios
        .post(`https://supplychaininventory-api.herokuapp.com/api/auth`, {
          email: values.email,
          password: values.password
        })
        .then(res => {
          // console.log(res.data.success);
          if (
            res.data.success === true &&
            res.data["data"]["data"]["type"] === "SuperAdmin"
          ) {
            localStorage.setItem("type", "Superadmin");
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("token", res.data["data"]["data"]["token"]);
            props.history.push("/dashboard");
            window.location.reload();
          } else if (
            res.data.success === true &&
            res.data["data"]["data"]["type"] === "ProfileAdmin"
          ) {
            localStorage.setItem("type", "Profileadmin");
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("token", res.data["data"]["data"]["token"]);
            props.history.push("/dashboard");
            window.location.reload();
          } 
          else if (
            res.data.success === true &&
            res.data["data"]["data"]["type"] === "ProcurementManager"
          ) {
            localStorage.setItem("type", "Procurementmanager");
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("token", res.data["data"]["data"]["token"]);
            props.history.push("/dashboard");
            window.location.reload();
          } else if (
            res.data.success === true &&
            res.data["data"]["data"]["type"] === "InventoryManager"
          ) {
            localStorage.setItem("type", "Inventorymanager");
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("token", res.data["data"]["data"]["token"]);
            props.history.push("/dashboard");
            window.location.reload();
          } else if (
            res.data.success === true &&
            res.data["data"]["data"]["type"] === "LocationUser"
          ) {
            localStorage.setItem("type", "Locationuser");
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("token", res.data["data"]["data"]["token"]);
            props.history.push("/dashboard");
            window.location.reload();
          } else if (
            res.data.success === true &&
            res.data["data"]["data"]["type"] === "LocationManager"
          ) {
            localStorage.setItem("type", "Locationmanager");
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("token", res.data["data"]["data"]["token"]);
            props.history.push("/dashboard");
            window.location.reload();
          }
        })
        .catch(error => {
          console.log(error);
          setNotification("Error while logging in");
          setOpen(true);
        });
      // if (values.email === "superadmin") {
      //   localStorage.clear();
      //   localStorage.setItem("type", "Superadmin");
      //   localStorage.setItem("loggedIn", true);
      //   props.history.push("/dashboard");
      //   window.location.reload();
      // } else if (values.email === "admin") {
      //   localStorage.clear();
      //   localStorage.setItem("type", "admin");
      //   localStorage.setItem("loggedIn", true);
      //   props.history.push("/dashboard");
      //   window.location.reload();
      // } else {
      //   localStorage.clear();
      //   localStorage.setItem("type", "Superadmin");
      //   localStorage.setItem("loggedIn", true);
      //   props.history.push("/dashboard");
      //   window.location.reload();
      // }
    }
  }

  // function signUpfunc() {
  //   console.log("Sign Up");
  // }

  // console.log(values.email === undefined || values.email.includes("@"));

  if (!loggedIn) {
    return (
      <form onSubmit={e => loggedInfunc(e)}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={backgroundStyle}
        >
          <Grid item xs={12} container spacing={1} style={gridStyle}>
            <Fade in={true} timeout={1000}>
              <Grid item xs={12}>
                <Typography>Supply Chain Management</Typography>
              </Grid>
            </Fade>
            <Fade in={true} timeout={2000}>
              <Grid item xs={12}>
                <CssTextField
                  className={classes.margin}
                  id="outlined-email-input"
                  label="Email"
                  // type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  value={values.email || ""}
                  error={
                    values.email === undefined
                      ? false
                      : values.email.length === 0
                      ? true
                      : false
                  }
                  helperText={
                    values.email === undefined
                      ? false
                      : values.email.length === 0
                      ? "This cannot be empty"
                      : null
                  }
                  onChange={handleChange("email")}
                  required
                  fullWidth
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.input
                  }}
                />
              </Grid>
            </Fade>
            <Fade in={true} timeout={3000}>
              <Grid item xs={12}>
                <CssTextField
                  className={classes.margin}
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange("password")}
                  required
                  fullWidth
                  value={values.password || ""}
                  error={
                    values.password === undefined
                      ? false
                      : values.password.length === 0
                      ? true
                      : false
                  }
                  helperText={
                    values.password === undefined
                      ? false
                      : values.password.length === 0
                      ? "This cannot be empty"
                      : false
                  }
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.input
                  }}
                />
              </Grid>
            </Fade>
            {/* 
            <Fade in={true} timeout={3500}>
              <Grid item xs={12}>
                <CssTextField
                  id="outlined-select-type"
                  select
                  label="Type"
                  className={classes.margin}
                  value={values.type}
                  onChange={handleChange("type")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Please select your type"
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.input
                  }}
                >
                  {types.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </Grid>
            </Fade> */}

            <Fade in={true} timeout={4000}>
              <Grid item xs={6}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  size="large"
                  type="submit"
                  // onClick={() => loggedInfunc()}
                >
                  Login
                </Button>
              </Grid>
            </Fade>
            {/* <Fade in={true} timeout={5000}>
              <Grid item xs={6}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  size="large"
                  onClick={() => signUpfunc()}
                >
                  Sign Up
                </Button>
              </Grid>
            </Fade> */}
          </Grid>
        </Grid>
        <Notification
          open={open}
          handleClose={handleClose}
          notification={notification}
        />
      </form>
    );
  } else {
    return <Redirect to="/dashboard" />;
  }
}
