import React, { useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton, CircularProgress } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import axios from "axios";
import { BASE_URL } from "../../../baseurl.js";
import Reload from "@material-ui/icons/Replay";

import Modify from "./Modify";

import Notification from "../../../components/Notification/Notification";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  progress: {
    paddingLeft: "48%",
    paddingTop: "23%"
  }
}));

export default function CustomizedTables(props) {
  const classes = useStyles();

  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }


  useEffect(() => {
    axios
      .get(`${BASE_URL}/inventorymanager/orders`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          console.log(res.data.data.Item);
          setItems(res.data.data.Item);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [props.token]);


  function acceptOrder(order) {
    console.log(order);
    axios
      .post(`${BASE_URL}/inventorymanager/order/accept`, {
        order: order,
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res);
        setOpen(true);
        setNotification("Order Approved Successfully!");
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
        setNotification(error.response.data["Error"]["message"]);
        setOpen(true);
      });
  }


  function rejectOrder(id) {
    console.log(id);
    axios
      .get(`${BASE_URL}/inventorymanager/order/reject/${id}`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res.data);
        setOpen(true);
        setNotification("Order Rejected Successfully!");
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        setOpen(true);
        setNotification("Not Rejected due to some problem! try later");
        setError(true);
      });
  }


  console.log(error);
  if (items.length > 0) {
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Item</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Approve</StyledTableCell>
                <StyledTableCell align="right">Reject</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(row => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Modify token={props.token} data={row} accept={acceptOrder} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      variant="contained"
                      color="secondary"
                      onClick={() => rejectOrder(row._id)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Notification
          open={open}
          handleClose={handleClose}
          notification={notification}
        />
      </div>
    );
  } else if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  else if (items.length === 0 && error === false) {
    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <h5>No Requests...</h5>
      </div>
    );
  } else if (error === true) {
    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <h2>
          Error Occured!{" "}
          <IconButton
            size="medium"
            color="secondary"
            style={{ color: "red" }}
            onClick={() => window.location.reload()}
          >
            <Reload />
          </IconButton>
        </h2>
        <CircularProgress color="secondary" />
      </div>
    );
  }
}
