import React from "react";
import { Grid, Button, TextField, withStyles } from "@material-ui/core";

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

export default function CreateCtiy() {
  const [city, setCity] = React.useState(undefined);

  const handleCity = name => event => {
    setCity(event.target.value);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <CssTextField
          id="outlined-city"
          label="City"
          value={city || ""}
          onChange={handleCity("city")}
          margin="normal"
          variant="outlined"
          fullWidth
          error={city === undefined ? false : city.length === 0 ? true : false}
          helperText={
            city === undefined
              ? false
              : city.length === 0
              ? "This cannot be empty"
              : false
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          color="secondary"
          variant="contained"
          style={{ width: "100%", textTransform: "none" }}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
}
