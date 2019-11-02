import React, { useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton, Button, CircularProgress } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import axios from "axios";
import { BASE_URL } from "../../../baseurl.js";
import Reload from "@material-ui/icons/Replay";

import Order from "./Order";

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
  }
}));

export default function CustomizedTables(props) {
  const classes = useStyles();

  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }


  useEffect(() => {
    axios
      .get(`${BASE_URL}/procurementmanager/marketplace`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          console.log(res.data.data.items);
          setItems(res.data["data"]["items"]);
        }
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, [props.token]);


  function getOrder(order) {
    console.log(order);
    axios
      .post(`${BASE_URL}/procurementmanager/order`, {
        order: order,
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res);
        setOpen(true);
        setNotification("Ordered Successfully!");
        window.location.reload();

      })
      .catch(error => {
        console.log(error.response);
        setNotification("Some Problem occured! Try again later");
        setOpen(true);
        window.location.reload();
      });

  }

  console.log(error);
  if (items.length === 0) {
    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <h5>Loading...</h5>
        <CircularProgress color="secondary" />
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
  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Order</StyledTableCell>
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
                  {row.quantity > 0 ? (
                    <Order token={props.token} data={row} order={getOrder} />
                  ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        disabled
                      >
                        Order
                        </Button>
                    )}
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
}