import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import axios from "axios";
import { BASE_URL } from "../../../../baseurl.js";
import Update from './Update';
import Notification from "../../../../components/Notification/Notification.jsx";

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

  const [products, setProducts] = React.useState([]);
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
      .get(`${BASE_URL}/profileadmin/item/get`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          console.log(res.data.data);
          setProducts(res.data["data"]["Item"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.token]);

  function getProducts() {
    axios
      .get(`${BASE_URL}/profileadmin/item/get`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          console.log(res.data.data);
          setProducts(res.data["data"]["Item"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function updateProducts(items, id) {
    console.log(items);
    axios
      .post(`${BASE_URL}/profileadmin/item/update/${id}`, {
        item : items,
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res);
        setOpen(true);
        setNotification("Product Updated SuccessFully!");
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
        setOpen(true);
        setNotification("Error Occured While Updating Product");
      });
  }

  // if (products.length === 0) {
  //   return <div>Loading</div>;
  // }
  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>ItemName</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(row => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                <StyledTableCell align="right">
                  <Update id={row._id} data={row} update={updateProducts}/>
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
