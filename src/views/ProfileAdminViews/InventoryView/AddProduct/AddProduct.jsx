import React, { useRef, useEffect } from "react";
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

export default function AddProduct(props) {
  const [productValues, setproductvalues] = React.useState({
    itemname: undefined,
    price: undefined
  });

  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  const handleUserChange = name => event => {
    setproductvalues({ ...productValues, [name]: event.target.value });
  };

  const itemname = useRef(null);
  const price = useRef(null);
  const createproduct = useRef(null);

  useEffect(() => {
    itemname.current.focus();
  }, []);

  function create() {
    if (
      productValues.itemname === undefined ||
      productValues.itemname.length === 0
    ) {
      setOpen(true);
      setNotification("Item Name Cannot be Empty");
      setproductvalues({ ...productValues, itemname: "" });
    } else if (
      productValues.price === undefined ||
      productValues.price < 0 || productValues.price === 0) {
      setOpen(true);
      setNotification("Price Cannot be 0 or less");
      setproductvalues({ ...productValues, price: "" });
    }
  }

  function clear() {
    setproductvalues({
      itemname: undefined,
      price: undefined
    });
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <Grid container spacing={0} style={{ height: "73vh" }}>
      <Fade in={true} timeout={1400}>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Product Details</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              inputRef={itemname}
              id="itemname-name"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  price.current.focus();
                }
              }}
              label="Item Name"
              value={productValues.itemname || ""}
              onChange={handleUserChange("itemname")}
              // InputProps={{
              //   onChange: handleUserChange("name")
              // }}
              margin="normal"
              variant="outlined"
              fullWidth
              required={true}
              error={
                productValues.itemname === undefined
                  ? false
                  : productValues.itemname.length === 0
                    ? true
                    : false
              }
              helperText={
                productValues.itemname === undefined
                  ? false
                  : productValues.itemname.length === 0
                    ? "This cannot be empty"
                    : false
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="price-price"
              inputRef={price}
              label="Price"
              type="price"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  createproduct.current.focus();
                }
              }}
              value={productValues.price || ""}
              onChange={handleUserChange("price")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                productValues.price === undefined
                  ? false
                  : productValues.price.length === 0
                    ? true
                    : false
              }
              helperText={
                productValues.price === undefined
                  ? false
                  : productValues.price < 0 || productValues.price === 0
                    ? "This cannot be 0 or less"
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
            ref={createproduct}
            variant="contained"
            color="secondary"
            size="medium"
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
            size="medium"
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
