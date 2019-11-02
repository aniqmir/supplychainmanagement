import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core";

import Notification from "../../../../components/Notification/Notification.jsx";
import axios from "axios";

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
  const [item, setItems] = React.useState({
    name: props.data.name,
    price: props.data.price,
    quantity: props.data.quantity
  });


  
  const name = useRef(null);
  const price = useRef(null);
  const quantity = useRef(null);
  
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  const handleItemChange = name => event => {
    setItems({ ...item, [name]: event.target.value });
  };

  function create() {
    if (
      item.name === undefined ||
      item.name.length === 0
    ) {
      setOpen(true);
      setNotification("Item Name Cannot be Empty");
      setItems({ ...item, name: "" });
    } else if (
      item.price === undefined ||
      item.price < 0 || item.price === 0) {
      setOpen(true);
      setNotification("Price Cannot be 0 or less");
      setItems({ ...item, price: "" });
    }else if (
      item.quantity === undefined ||
      item.quantity < 0 || item.quantity === 0) {
      setOpen(true);
      setNotification("Quantity Cannot be  zero or less");
      setItems({ ...item, quantity: "" });
    }
    else{
      props.update(item, props.id);
      clear();
      handleDialogClose();
    }
  }
  function clear() {
    setItems({
      quantity: undefined
    });
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

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
        variant="contained"
        color="secondary"
        size="small"
        style={{ marginRight: "10px", marginTop: "5px" }}
      >
        Update
        </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To complete your Order, Kindly view the following details and let us know the quantity in which you wanna item the product.
          </DialogContentText>
          <CssTextField
              inputRef={name}
              id="name-name"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  price.current.focus();
                }
              }}
              label="Item Name"
              value={item.name || ""}
              onChange={handleItemChange("name")}
              // InputProps={{
              //   onChange: handleItemChange("name")
              // }}
              margin="normal"
              variant="outlined"
              fullWidth
              required={true}
              error={
                item.name === undefined
                  ? false
                  : item.name.length === 0
                    ? true
                    : false
              }
              helperText={
                item.name === undefined
                  ? false
                  : item.name.length === 0
                    ? "This cannot be empty"
                    : false
              }
            />
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
              value={item.price || ""}
              onChange={handleItemChange("price")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                item.price === undefined
                  ? false
                  : item.price.length === 0
                    ? true
                    : false
              }
              helperText={
                item.price === undefined
                  ? false
                  : item.price < 0 || item.price === 0
                    ? "This cannot be 0 or less"
                    : false
              }
            />
            <CssTextField
              id="quantity-quantity"
              inputRef={quantity}
              label="Quantity"
              type="quantity"
              
              value={item.quantity || ""}
              onChange={handleItemChange("quantity")}
              margin="normal"
              variant="outlined"
              fullWidth
              error={
                item.quantity === undefined
                  ? false
                  : item.quantity.length === 0
                    ? true
                    : false
              }
              helperText={
                item.quantity === undefined
                  ? false
                  : item.quantity < 0 || item.quantity === 0
                    ? "This cannot be 0 or less"
                    : false
              }
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => create()}
            color="primary">
            Update
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
