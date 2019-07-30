import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

export default function ResponsiveDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.data.username}
        </DialogTitle>
        <DialogContent dividers={true}>
          <img
            src={props.data.displaypicture}
            alt="dp"
            style={{ width: "100px", height: "auto", borderRadius: "100px" }}
          />
          <Typography component="div" variant="h5">
            <DialogContentText>{props.data.name}</DialogContentText>
          </Typography>
          <Typography component="div" variant="h5">
            <DialogContentText>{props.data.phone}</DialogContentText>{" "}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose()} color="primary">
            Disagree
          </Button>
          <Button onClick={() => props.handleClose()} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
