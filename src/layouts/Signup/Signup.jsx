import React from "react";
import {
  withStyles,
  Grid,
  Divider,
  Typography,
  TextField,
  Button,
  MenuItem,
  Fade
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../../components/Notification/Notification.jsx";

import axios from "axios";

import {
  CountryDropdown,
  RegionDropdown
  // CountryRegionData
} from "react-country-region-selector";

import { BASE_URL } from "../../baseurl.js"; //baseurl



// const types = [
//   {
//     value: "admin",
//     label: "Admin"
//   }
// ];

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey"
      },
      "&:hover fieldset": {
        borderColor: "pink"
      },
      "&.Mui-focused fieldset": {
        borderColor: "pink"
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
  },
  gridStyle : {
    minWidth: "50%",
    textAlign: "center",
    position: "absolute",
    maxWidth: "55%",
    [theme.breakpoints.down("md")]: {
        minWidth: "65%",
        maxWidth: "70%"
    },    
    [theme.breakpoints.down("sm")]: {
            minWidth : "80%",
            maxWidth : "80%"
    }
  }, 
 gridHeight : {
  minHeight: 60,
  maxHeight: 70,
  [theme.breakpoints.down("md")]: {
      minHeight: 50,
      maxHeight: 60,
      marginTop: "10px"
  },    
  [theme.breakpoints.down("sm")]: {
          minHeight : 50,
          maxHeight : 60,
          marginTop: "10px"
  }
},
backgroundStyle : {
  backgroundImage:
    "url(https://i.pinimg.com/originals/e0/d6/6a/e0d66a03fdf7fecce02b8b76e141d325.jpg)",
  width: "100%",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "rgba(0,0,0,0.8)",
  backgroundBlendMode: "overlay",
  [theme.breakpoints.down("md")]: {
    height : "150vh"
  },
  [theme.breakpoints.down("sm")]: {
    height : "170vh"
  }
}
}));

export default function CreateProfile(props) {
  const classes = useStyles();
  const [profilevalues, setprofileValues] = React.useState({
    name: undefined,
    username: undefined,
    email: undefined,
    country: "",
    city: "",
    phone: undefined,
    picture: undefined,
    salestax: undefined
  });

  const [adminvalues, setadminValues] = React.useState({
    email: undefined,
    password: undefined,
    name: undefined,
    surname: undefined,
    phone: undefined,
    designation: undefined,
    type: "admin"
  });

  // const [country, setCountry] = React.useState("");
  // const [city, setRegion] = React.useState("");

  // const [cities, setCities] = React.useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/superadmin/city`, {
  //       headers: { Authorization: `bearer ` + props.token }
  //     })
  //     .then(res => {
  //       if (res.data.success === true) {
  //         setCities(res.data.data.cities);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //     });
  // }, [props.token]);
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  const handleProfileChange = name => event => {
    setprofileValues({ ...profilevalues, [name]: event.target.value });
  };

  const handleAdminChange = name => event => {
    setadminValues({ ...adminvalues, [name]: event.target.value });
  };

  function create() {
    if (profilevalues.name === undefined || profilevalues.name.length === 0) {
      setOpen(true);
      setNotification("Profile Name Cannot be Empty");
    }else if(
      profilevalues.salestax === undefined || 
      profilevalues.salestax.length === 0
    ) {
      setOpen(true);
      setNotification("Profile Sale Tax Cannot be Empty");
    } else if (
      adminvalues.email === undefined ||
      adminvalues.email.length === 0
    ) {
      setOpen(true);
      setNotification("Admin Profile Email Cannot be Empty");
    } else if (
      adminvalues.password === undefined ||
      adminvalues.password.length === 0
    ) {
      setOpen(true);
      setNotification("Admin Profile Password Cannot be Empty");
    } else {
      axios
        .post(`${BASE_URL}/profileadmin/profile`, {
          profile: profilevalues,
          profileAdmin: adminvalues
        })
        .then(res => {
          console.log(res);
          setOpen(true);
          setNotification("Profile Created Successfully!");
          clear();
        })
        .catch(error => {
          alert(error.data.Error.message);
          setOpen(true);
          setNotification(error.data.Error.message);
        });
    }
  }

  function clear() {
    setprofileValues({
      name: undefined,
      username: undefined,
      email: undefined,
      country: "",
      city: "",
      phone: undefined,
      picture: undefined,
      salestax: undefined
    });
    setadminValues({
      email: undefined,
      password: undefined,
      name: undefined,
      surname: undefined,
      phone: undefined,
      designation: undefined,
      type: "admin"
    });
  }
  const loggedIn = localStorage.getItem("loggedIn");

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  if (!loggedIn) {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.backgroundStyle}
    >

      <Fade in={true} timeout={1400}>
        <Grid item xs={12} container spacing={2} className={classes.gridStyle}>
          <Grid item xs={12}>
            <Typography variant="h5">Organization Details</Typography>
          </Grid>

          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <CssTextField
              id="outlined-name"
              label="Name"
              value={profilevalues.name || ""}
              onChange={handleProfileChange("name")}
              // InputProps={{
              //   onChange: handleProfileChange("name")
              // }}
              margin="normal"
              variant="outlined"
              fullWidth
              required={true}
              error={
                profilevalues.name === undefined
                  ? false
                  : profilevalues.name.length === 0
                    ? true
                    : false
              }
              helperText={
                profilevalues.name === undefined
                  ? false
                  : profilevalues.name.length === 0
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
          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <CssTextField
              id="outlined-username"
              label="UserName"
              value={profilevalues.username || ""}
              onChange={handleProfileChange("username")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                profilevalues.username === undefined
                  ? false
                  : profilevalues.username.length === 0
                    ? true
                    : false
              }
              helperText={
                profilevalues.username === undefined
                  ? false
                  : profilevalues.username.length === 0
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
          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <CssTextField
              id="outlined-email"
              label="Email"
              type="email"
              value={profilevalues.email || ""}
              onChange={handleProfileChange("email")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                profilevalues.email === undefined
                  ? false
                  : profilevalues.email.length === 0
                    ? true
                    : false
              }
              helperText={
                profilevalues.email === undefined
                  ? false
                  : profilevalues.email.length === 0
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
          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <CountryDropdown
              value={profilevalues.country}
              onChange={val =>
                setprofileValues({
                  ...profilevalues,
                  country: val
                })
              }
              classes={"form-control"}
              style={{ backgroundColor: "transparent", marginTop: "4.68%", minHeight: "57px" }}

            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <RegionDropdown
              country={profilevalues.country}
              value={profilevalues.city}
              onChange={val =>
                setprofileValues({
                  ...profilevalues,
                  city: val
                })
              }
              classes={"form-control"}
              style={{ marginTop: "4.68%", minHeight: "57px", backgroundColor: "transparent" }}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <CssTextField
              id="outlined-phone"
              label="Phone"
              value={profilevalues.phone || ""}
              onChange={handleProfileChange("phone")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                profilevalues.phone === undefined
                  ? false
                  : profilevalues.phone.length === 0
                    ? true
                    : false
              }
              helperText={
                profilevalues.phone === undefined
                  ? false
                  : profilevalues.phone.length === 0
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
          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <CssTextField
              id="outlined-salestax"
              label="Salestax"
              value={profilevalues.salestax || ""}
              onChange={handleProfileChange("salestax")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                profilevalues.salestax === undefined
                  ? false
                  : profilevalues.salestax.length === 0
                    ? true
                    : false
              }
              helperText={
                profilevalues.salestax === undefined
                  ? false
                  : profilevalues.salestax.length === 0
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
          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <Button
              variant="outlined"
              component="label"
              style={{ width: "100%", marginTop: "20px", height: "50px"  }}
              disabled={true}
            >
              Upload Picture
              <input type="file" style={{ display: "none" }} />
            </Button>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "25px" }}>
            <Typography variant="h5">Admin Details</Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <CssTextField
              id="outlined-email"
              label="Email"
              type="email"
              value={adminvalues.email || ""}
              onChange={handleAdminChange("email")}
              required
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                adminvalues.email === undefined
                  ? false
                  : adminvalues.email.length === 0
                    ? true
                    : false
              }
              helperText={
                adminvalues.email === undefined
                  ? false
                  : adminvalues.email.length === 0
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
          <Grid item xs={12} md={6} className={classes.gridHeight}>
            <CssTextField
              id="outlined-password"
              label="Password"
              type="password"
              value={adminvalues.password || ""}
              onChange={handleAdminChange("password")}
              required
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                adminvalues.password === undefined
                  ? false
                  : adminvalues.password.length === 0
                    ? true
                    : false
              }
              helperText={
                adminvalues.password === undefined
                  ? false
                  : adminvalues.password.length === 0
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
          <Grid item xs={12} className={classes.gridHeight} >
            <Button
              variant="outlined"
              size="large"
              style={{ textTransform: "none", color: "white", borderColor: "white", marginTop: "20px", height: "50px" }}
              onClick={() => create()}
            >
              Create Profile
          </Button>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px"}}>
                Already Signed Up, then
                <Link
                  to="/"
                >
                  <span style={{ marginLeft: "5px",  color: "#ccc" }}>Log in</span>
                </Link>
          </Grid>
        </Grid>
      </Fade>
      <Notification
        open={open}
        handleClose={handleClose}
        notification={notification}
      />
    </Grid>
   );
  } else {
  return <Redirect to="/dashboard" />;
  }
}
