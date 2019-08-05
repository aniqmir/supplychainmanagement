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

import Notification from "../../../components/Notification/Notification.jsx";

import axios from "axios";

import { BASE_URL } from "../../../baseurl.js"; //baseurl

const types = [
  {
    value: "manager",
    label: "Manager"
  },
  {
    value: "employee",
    label: "Employee"
  }
];

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black"
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

export default function CreateProfile(props) {
  const [profilevalues, setprofileValues] = React.useState({
    name: undefined,
    username: undefined,
    email: undefined,
    city: undefined,
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
    type: ""
  });

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
        .post(`${BASE_URL}/superadmin/profile`, {
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
      city: undefined,
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
      type: ""
    });
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  return (
    <Grid container spacing={2}>
      <Fade in={true} timeout={1400}>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Profile Details</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-city"
              label="City"
              value={profilevalues.city || ""}
              onChange={handleProfileChange("city")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                profilevalues.city === undefined
                  ? false
                  : profilevalues.city.length === 0
                  ? true
                  : false
              }
              helperText={
                profilevalues.city === undefined
                  ? false
                  : profilevalues.city.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} style={{ paddingTop: "2%" }}>
            <Button
              variant="contained"
              component="label"
              style={{ width: "100%" }}
              disabled={true}
            >
              Upload Picture
              <input type="file" style={{ display: "none" }} />
            </Button>
          </Grid>
        </Grid>
      </Fade>
      <Fade in={true} timeout={2000}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Fade>
      <Fade in={true} timeout={2500}>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Profile Admin Details</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-name"
              label="Name"
              value={adminvalues.name || ""}
              onChange={handleAdminChange("name")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                adminvalues.name === undefined
                  ? false
                  : adminvalues.name.length === 0
                  ? true
                  : false
              }
              helperText={
                adminvalues.name === undefined
                  ? false
                  : adminvalues.name.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-surname"
              label="Surname"
              value={adminvalues.surname || ""}
              onChange={handleAdminChange("surname")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                adminvalues.surname === undefined
                  ? false
                  : adminvalues.surname.length === 0
                  ? true
                  : false
              }
              helperText={
                adminvalues.surname === undefined
                  ? false
                  : adminvalues.surname.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-phone"
              label="Phone"
              value={adminvalues.phone || ""}
              onChange={handleAdminChange("phone")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                adminvalues.phone === undefined
                  ? false
                  : adminvalues.phone.length === 0
                  ? true
                  : false
              }
              helperText={
                adminvalues.phone === undefined
                  ? false
                  : adminvalues.phone.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-designation"
              label="Designation"
              value={adminvalues.designation || ""}
              onChange={handleAdminChange("designation")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                adminvalues.designation === undefined
                  ? false
                  : adminvalues.designation.length === 0
                  ? true
                  : false
              }
              helperText={
                adminvalues.designation === undefined
                  ? false
                  : adminvalues.designation.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-select-type"
              select
              label="Type"
              value={adminvalues.type || ""}
              onChange={handleAdminChange("type")}
              SelectProps={{
                MenuProps: {
                  // className: classes.menu
                }
              }}
              margin="normal"
              variant="outlined"
              fullWidth
              helperText={
                adminvalues.type === "" ? "Please select your type" : null
              }
            >
              {types.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CssTextField>
          </Grid>
        </Grid>
      </Fade>
      <Fade in={true} timeout={3000}>
        <Grid item xs={6} sm={3} md={1}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ textTransform: "none" }}
            onClick={() => create()}
          >
            Create
          </Button>
        </Grid>
      </Fade>
      <Fade in={true} timeout={3000}>
        <Grid item xs={6} sm={3} md={1}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ textTransform: "none" }}
            onClick={() => clear()}
          >
            Clear
          </Button>
        </Grid>
      </Fade>
      <Notification
        open={open}
        handleClose={handleClose}
        notification={notification}
      />
    </Grid>
  );
}
