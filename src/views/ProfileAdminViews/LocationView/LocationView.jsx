import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
  Divider
} from "@material-ui/core";

import Table from "./LocationsTable/LocationsTable.jsx";

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

export default function Location() {
  const [location, setLocation] = React.useState(undefined);
  const locationRef = React.useRef(null);
  const submitRef = React.useRef(null);

  useEffect(() => {
    locationRef.current.focus();
  });

  function handleUserChange(e) {
    setLocation(e.target.value);
  }

  function submit() {
    console.log(location);
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
          onChange={e => handleUserChange(e)}
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
        <Table />
      </Grid>
    </Grid>
  );
}
