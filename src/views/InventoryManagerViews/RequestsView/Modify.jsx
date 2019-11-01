import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core";

import Notification from "../../../components/Notification/Notification.jsx";
import axios from "axios";
import { BASE_URL } from "../../../baseurl.js"; //baseurl

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




export default function FormDialog(props) {
  const [order, setOrder] = React.useState({
    _id: props.data._id,
    name: props.data.name,
    to: props.data.to,
    from: props.data.from,
    quantity: props.data.quantity,
    price: props.data.price,
    quantityChanged: undefined
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  const handleOrderChange = name => event => {
    setOrder({ ...order, [name]: event.target.value });
  };

  function create() {
    console.log(order);
    if (order.quantityChanged === undefined || order.quantityChanged.length === 0 || order.quantityChanged < 1) {
      setOpen(true);
      setNotification("You should enter valid quantity");
    } else if (order.quantityChanged > props.data.quantity) {
      setOpen(true);
      setNotification(`Maximum quantity you can enter right now is ${props.data.quantity}`);
    } else {
      props.accept(order);
      clear();
      handleDialogClose();
    }

  }

  function clear() {
    setOrder({
      quantityChanged: undefined
    });
  }
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleDialogOpen}
        color="primary"
        size="small"
      >
        Approve
        </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To complete your Order, Kindly view the following details and let us know the quantity in which you wanna confirm the order.
          </DialogContentText>
          <CssTextField
            id="outlined-quantity"
            label="Quantity you wanna approve"
            value={order.quantityChanged || ""}
            onChange={handleOrderChange("quantityChanged")}
            // InputProps={{
            //   onChange: handleProfileChange("name")
            // }}
            type="number"
            margin="normal"
            variant="outlined"
            fullWidth
            required={true}
            error={
              order.quantityChanged === undefined
                ? false
                : order.quantityChanged.length === 0
                  ? true
                  : false
            }
            helperText={
              order.quantityChanged === undefined
                ? false
                : order.quantityChanged.length === 0
                  ? "This cannot be empty"
                  : false
            }
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Name"
            defaultValue={props.data.name}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Price"
            defaultValue={props.data.price}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Quantity Ordered By User"
            defaultValue={props.data.quantity}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => create()}
            color="primary">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        open={open}
        handleClose={handleClose}
        notification={notification}
      />
    </div>
  );
}
