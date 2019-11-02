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
    name: undefined,
    price: undefined,
    quantity: undefined
  });

  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  const handleUserChange = name => event => {
    setproductvalues({ ...productValues, [name]: event.target.value });
  };

  const name = useRef(null);
  const price = useRef(null);
  const quantity = useRef(null);
  const createproduct = useRef(null);

  useEffect(() => {
    name.current.focus();
  }, []);

  function create() {
    if (
      productValues.name === undefined ||
      productValues.name.length === 0
    ) {
      setOpen(true);
      setNotification("Item Name Cannot be Empty");
      setproductvalues({ ...productValues, name: "" });
    } else if (
      productValues.price === undefined ||
      productValues.price < 0 || productValues.price === 0) {
      setOpen(true);
      setNotification("Price Cannot be 0 or less");
      setproductvalues({ ...productValues, price: "" });
    }else if (
      productValues.quantity === undefined ||
      productValues.quantity < 0 || productValues.quantity === 0) {
      setOpen(true);
      setNotification("Quantity Cannot be  zero or less");
      setproductvalues({ ...productValues, quantity: "" });
    }
    else{
      console.log(productValues);
      axios
        .post(`${BASE_URL}/profileadmin/item/add`, {
          item : productValues,
          headers: { Authorization: `bearer ` + props.token }
        })
        .then(res => {
          console.log(res);
          setOpen(true);
          setNotification("Product Added SuccessFully!");
          window.location.reload();
        })
        .catch(error => {
          console.log(error.response);
          setOpen(true);
          setNotification("Error Occured While Adding Product");
        });
    }
  }

  function clear() {
    setproductvalues({
      name: undefined,
      price: undefined,
      quantity: undefined
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
              inputRef={name}
              id="name-name"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  price.current.focus();
                }
              }}
              label="Item Name"
              value={productValues.name || ""}
              onChange={handleUserChange("name")}
              // InputProps={{
              //   onChange: handleUserChange("name")
              // }}
              margin="normal"
              variant="outlined"
              fullWidth
              required={true}
              error={
                productValues.name === undefined
                  ? false
                  : productValues.name.length === 0
                    ? true
                    : false
              }
              helperText={
                productValues.name === undefined
                  ? false
                  : productValues.name.length === 0
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
                  quantity.current.focus();
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
          <Grid item xs={12} sm={6} md={3}>
            <CssTextField
              id="quantity-quantity"
              inputRef={quantity}
              label="Quantity"
              type="quantity"
              
              value={productValues.quantity || ""}
              onChange={handleUserChange("quantity")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                productValues.quantity === undefined
                  ? false
                  : productValues.quantity.length === 0
                    ? true
                    : false
              }
              helperText={
                productValues.quantity === undefined
                  ? false
                  : productValues.quantity < 0 || productValues.quantity === 0
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
