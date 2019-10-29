import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        color="primary"
        size="small"
        style={{ marginRight: "10px", marginTop: "5px" }}
      // onClick={() => approve(type)}
      >
        Modify
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modify Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can modify the Order, Kindly view the following details and confirm the quantity of item ordered  by user. User will be notify about the modifications. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            fullWidth
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Name"
            defaultValue={props.data.itemname}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
