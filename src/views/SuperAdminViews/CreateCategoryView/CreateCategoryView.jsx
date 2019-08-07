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

export default function CreateCategory() {
  const [category, setCategory] = React.useState(undefined);
  const [subcategory, setSubCategory] = React.useState(undefined);

  const handleCategory = name => event => {
    setCategory(event.target.value);
  };

  const handleSubCategory = name => event => {
    setSubCategory(event.target.value);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <CssTextField
          id="outlined-category"
          label="Category"
          value={category || ""}
          onChange={handleCategory("category")}
          margin="normal"
          variant="outlined"
          fullWidth
          error={
            category === undefined
              ? false
              : category.length === 0
              ? true
              : false
          }
          helperText={
            category === undefined
              ? false
              : category.length === 0
              ? "This cannot be empty"
              : false
          }
        />
      </Grid>
      {category === undefined || category.length === 0 ? null : (
        <CssTextField
          id="outlined-subcategory"
          label="Sub Category"
          value={subcategory || ""}
          onChange={handleSubCategory("subcategory")}
          margin="normal"
          variant="outlined"
          fullWidth
          error={
            subcategory === undefined
              ? false
              : subcategory.length === 0
              ? true
              : false
          }
          helperText={
            subcategory === undefined
              ? false
              : subcategory.length === 0
              ? "This cannot be empty"
              : false
          }
        />
      )}
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
