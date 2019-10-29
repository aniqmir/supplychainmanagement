import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton, CircularProgress } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Delete from "@material-ui/icons/Delete";
import axios from "axios";
import { BASE_URL } from "../../../baseurl.js";
import Reload from "@material-ui/icons/Replay";

import Modify from "./Modify";

// import Notification from "../../../../components/Notification/Notification.jsx";

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

  // const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  // const [notification, setNotification] = React.useState("");

  // function handleClose(event, reason) {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // }

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/profileadmin/marketplace/get/items`, {
  //       headers: { Authorization: `bearer ` + props.token }
  //     })
  //     .then(res => {
  //       if (res.data.success === true) {
  //         console.log(res.data.data.Item);
  //         setItems(res.data["data"]["Item"]);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setError(true);
  //     });
  // }, [props.token]);
  const items = [
    {
      item: "item1",
      price: 12000,
      username: "customer1@gmail.com",
      location: "Coffee Location",
      date: "10-29-2019",
      quantityOrdered: 4
    },{
     item: "item2",
      price: 13000,
      username: "customer2@gmail.com",
      location: "Coffee Location",
      date: "10-29-2019",
      quantityOrdered: 3
    },{
     item: "item3",
      price: 14000,
      username: "customer3@gmail.com",
      location: "Coffee Location",
      date: "10-29-2019",
      quantityOrdered: 4
    },{
     item: "item4",
      price: 15000,
      username: "customer4@gmail.com",
      location: "Coffee Location",
      date: "10-29-2019",
      quantityOrdered: 2
    },{
     item: "item5",
      price: 16000,
      username: "customer5@gmail.com",
      location: "Coffee Location",
      date: "10-29-2019",
      quantityOrdered: 3
    },{
     item: "item6",
      price: 17000,
      username: "customer6@gmail.com",
      location: "Coffee Location",
      date: "10-29-2019",
      quantityOrdered: 5
    }
  ]


  console.log(error);
  if (items.length === 0 && error === false) {
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
  } else if (items.length === 0 && error === true) {
    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <h2>
          Network Error Occured!{" "}
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
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(row => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.item}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price + "$"}</StyledTableCell>
                <StyledTableCell align="right">{row.username}</StyledTableCell>
                <StyledTableCell align="right">{row.quantityOrdered}</StyledTableCell>
                <StyledTableCell align="right">{row.location}</StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">
                  <Modify token={props.token} data={row} />
                </StyledTableCell>
                <StyledTableCell align="right">
                <IconButton
                  // onClick={() => deleteItem(row._id)}
                  variant="contained"
                  color="secondary"
                  style={{marginRight: "-10px"}}
                >
                  <Delete />
                </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper> 
      {/* <Notification
        open={open}
        handleClose={handleClose}
        notification={notification}
      /> */}
    </div>
  );
}
