import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton, CircularProgress } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import axios from "axios";
import { BASE_URL } from "../../../baseurl.js";
import Reload from "@material-ui/icons/Replay";

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
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    axios
      .get(`${BASE_URL}/locationuser/order`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          console.log(res.data);
          setItems(res.data["data"]["Item"]);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, [props.token]);
  //  const items = [
  //    {
  //      item: "item1",
  //      price: 12000,
  //      supplier: "supplier1@gmail.com",
  //      quantityOrdered: 4,
  //      status: "Processing",
  //      quantityConfirmed: 4  
  //    },{
  //     item: "item2",
  //     price: 13000,
  //     supplier: "supplier2@gmail.com",
  //     quantityOrdered: 3,
  //     status: "Processing",
  //     quantityConfirmed: 2 
  //   },
  //   {
  //     item: "item3",
  //     price: 14000,
  //     supplier: "supplier3@gmail.com",
  //     quantityOrdered: 3,
  //     status: "Processing",
  //     quantityConfirmed: 3 
  //   }
  //  ]


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
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Quantity Changed</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(row => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.location}</StyledTableCell>
                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">{row.quatityChanged}</StyledTableCell>
              
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );    
 }
