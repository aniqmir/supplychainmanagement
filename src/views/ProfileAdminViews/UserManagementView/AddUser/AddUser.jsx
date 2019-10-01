import React, { useRef, useEffect } from "react";
import {
  withStyles,
  Grid,
  Divider,
  Typography,
  TextField,
  Button,
  Fade
} from "@material-ui/core";

import Notification from "../../../../components/Notification/Notification.jsx";

import axios from "axios";

import { BASE_URL } from "../../../../baseurl.js"; //baseurl

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

export default function AddUser(props) {
  const [uservalues, setuserValues] = React.useState({
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    designation: undefined,
    location: undefined,
    password: undefined,
    confirmpassword: undefined,
    phone: undefined
  });

  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  const handleUserChange = name => event => {
    setuserValues({ ...uservalues, [name]: event.target.value });
  };

  const firstname = useRef(null);
  const lastname = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const designation = useRef(null);
  const location = useRef(null);
  const password = useRef(null);
  const confirmpassword = useRef(null);
  const createuser = useRef(null);

  useEffect(() => {
    firstname.current.focus();
  }, []);

  function create() {
    if (
      uservalues.firstname === undefined ||
      uservalues.firstname.length === 0
    ) {
      setOpen(true);
      setNotification("Profile First Name Cannot be Empty");
    } else {
      axios
        .post(`${BASE_URL}/superadmin/profile`, {
          profile: uservalues
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
    setuserValues({
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      designation: undefined,
      location: undefined,
      password: undefined,
      confirmpassword: undefined,
      phone: undefined
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
            <Typography variant="h5">User Details</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              inputRef={firstname}
              id="firstname-name"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  lastname.current.focus();
                }
              }}
              label="First Name"
              value={uservalues.firstname || ""}
              onChange={handleUserChange("firstname")}
              // InputProps={{
              //   onChange: handleUserChange("name")
              // }}
              margin="normal"
              variant="outlined"
              fullWidth
              required={true}
              error={
                uservalues.firstname === undefined
                  ? false
                  : uservalues.firstname.length === 0
                  ? true
                  : false
              }
              helperText={
                uservalues.firstname === undefined
                  ? false
                  : uservalues.firstname.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              inputRef={lastname}
              id="last-name"
              label="Last Name"
              value={uservalues.lastname || ""}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  email.current.focus();
                }
              }}
              onChange={handleUserChange("lastname")}
              // InputProps={{
              //   onChange: handleUserChange("name")
              // }}
              margin="normal"
              variant="outlined"
              fullWidth
              required={true}
              error={
                uservalues.lastname === undefined
                  ? false
                  : uservalues.lastname.length === 0
                  ? true
                  : false
              }
              helperText={
                uservalues.lastname === undefined
                  ? false
                  : uservalues.lastname.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-email"
              inputRef={email}
              label="Email"
              type="email"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  phone.current.focus();
                }
              }}
              value={uservalues.email || ""}
              onChange={handleUserChange("email")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                uservalues.email === undefined
                  ? false
                  : uservalues.email.length === 0
                  ? true
                  : false
              }
              helperText={
                uservalues.email === undefined
                  ? false
                  : uservalues.email.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <CountryDropdown
              value={uservalues.country}
              onChange={val =>
                setuserValues({
                  ...uservalues,
                  country: val
                })
              }
              classes={"form-control"}
              style={{ marginTop: "4.68%", minHeight: "57px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <RegionDropdown
              country={uservalues.country}
              value={uservalues.region}
              onChange={val =>
                setuserValues({
                  ...uservalues,
                  region: val
                })
              }
              classes={"form-control"}
              style={{ marginTop: "4.68%", minHeight: "57px" }}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-phone"
              inputRef={phone}
              label="Phone"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  location.current.focus();
                }
              }}
              value={uservalues.phone || ""}
              onChange={handleUserChange("phone")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                uservalues.phone === undefined
                  ? false
                  : uservalues.phone.length === 0
                  ? true
                  : false
              }
              helperText={
                uservalues.phone === undefined
                  ? false
                  : uservalues.phone.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-location"
              inputRef={location}
              label="Location"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  designation.current.focus();
                }
              }}
              value={uservalues.location || ""}
              onChange={handleUserChange("location")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                uservalues.location === undefined
                  ? false
                  : uservalues.location.length === 0
                  ? true
                  : false
              }
              helperText={
                uservalues.location === undefined
                  ? false
                  : uservalues.location.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-designation"
              inputRef={designation}
              label="Designation"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  password.current.focus();
                }
              }}
              value={uservalues.designation || ""}
              onChange={handleUserChange("designation")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                uservalues.designation === undefined
                  ? false
                  : uservalues.designation.length === 0
                  ? true
                  : false
              }
              helperText={
                uservalues.designation === undefined
                  ? false
                  : uservalues.designation.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-password"
              inputRef={password}
              label="Password"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  confirmpassword.current.focus();
                }
              }}
              type="password"
              value={uservalues.password || ""}
              onChange={handleUserChange("password")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                uservalues.password === undefined
                  ? false
                  : uservalues.password.length === 0
                  ? true
                  : false
              }
              helperText={
                uservalues.password === undefined
                  ? false
                  : uservalues.password.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="outlined-confirmpassword"
              label="Confirm Password"
              inputRef={confirmpassword}
              type="password"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  createuser.current.focus();
                }
              }}
              value={uservalues.confirmpassword || ""}
              onChange={handleUserChange("confirmpassword")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                uservalues.confirmpassword === undefined
                  ? false
                  : uservalues.confirmpassword.length === 0
                  ? true
                  : false
              }
              helperText={
                uservalues.confirmpassword === undefined
                  ? false
                  : uservalues.confirmpassword.length === 0
                  ? "This cannot be empty"
                  : false
              }
            />
          </Grid>
        </Grid>
      </Fade>
      <Fade in={true} timeout={2000}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Fade>
      <Fade in={true} timeout={3000}>
        <Grid item xs={6} sm={3} md={1}>
          <Button
            ref={createuser}
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
