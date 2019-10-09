import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
  Divider
} from "@material-ui/core";

import axios from "axios";
import { BASE_URL } from "../../../baseurl.js";

import Table from "./LocationsTable/LocationsTable.jsx";

import Notification from "../../../components/Notification/Notification.jsx";

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

export default function Location(props) {
  const [location, setLocation] = React.useState(undefined);
  const [locations, setLocations] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");
  const locationRef = React.useRef(null);
  const submitRef = React.useRef(null);

  useEffect(() => {
    locationRef.current.focus();
    axios
      .get(`${BASE_URL}/profileadmin/location/get`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setLocations(res.data["data"]["locations"]);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }, [props.token]);

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function getLocations() {
    axios
      .get(`${BASE_URL}/profileadmin/location/get`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setLocations(res.data["data"]["locations"]);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  function updateLocations() {
    axios
        .get(`${BASE_URL}/profileadmin/location/get`, {
            headers: { Authorization: `bearer ` + props.token }
        })
        .then(res => {
            if (res.data.success === true) {
                setLocations(res.data["data"]["locations"]);
            }
        })
        .catch(error => {
            console.log(error.response);
        });
}

function deleteLocation(id) {
    console.log(id);
    axios
        .get(`${BASE_URL}/profileadmin/location/remove/${id}`, {
            headers: { Authorization: `bearer ` + props.token }
        })
        .then(res => {
            console.log("response");
            console.log(res);
            // setOpen(true);
            // setNotification("User Deleted SuccessFully!");
            updateLocations();
            alert("Location Deleted");
        })
        .catch(error => {
            console.log(error);
            // setOpen(true);
            // setNotification("Error Occured While Deleting User");
        });
}


  function submit() {
    axios
      .post(`${BASE_URL}/profileadmin/location/add`, {
        headers: { Authorization: `bearer ` + props.token },
        locationname: location
      })
      .then(res => {
        if (res.data.success === true) {
          getLocations();
          setLocation(undefined);
          setOpen(true);
          setNotification("Location Added Successfully");
        }
      })
      .catch(error => {
        console.log(error.response);
        setLocation(undefined);
        setOpen(true);
        setNotification("Some Error Occured");
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
      <Grid item xs={12}>
        <CssTextField
          inputRef={locationRef}
          id="location"
          onKeyDown={e => {
            if (e.key === "Enter") {
              submitRef.current.focus();
            }
          }}
          label="Location"
          value={location || ""}
          onChange={e => handleLocationChange(e)}
          // InputProps={{
          //   onChange: handleUserChange("name")
          // }}
          margin="normal"
          variant="outlined"
          fullWidth
          required={true}
          error={
            location === undefined
              ? false
              : location.length === 0
              ? true
              : false
          }
          helperText={
            location === undefined
              ? false
              : location.length === 0
              ? "This cannot be empty"
              : false
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          color="secondary"
          onClick={() => submit()}
          ref={submitRef}
          variant="contained"
        >
          Submit
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={6} sm={12}>
        <Table 
        locations={locations} 
        
        onDelete={deleteLocation}/>
      </Grid>

      <Notification
        open={open}
        notification={notification}
        handleClose={handleClose}
      />
    </Grid>
  );
}
