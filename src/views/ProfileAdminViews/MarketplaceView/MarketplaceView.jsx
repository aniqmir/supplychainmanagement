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

  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  // const [notification, setNotification] = React.useState("");

  // function handleClose(event, reason) {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profileadmin/marketplace/get/items`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setUsers(res.data["data"]["Item"]);
        }
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, [props.token]);

  function bedefef() {
    console.log("abc");
  }
  function getUsers() {
    axios
      .get(`${BASE_URL}/profileadmin/marketplace/get/items`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setUsers(res.data["data"]["Item"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function deleteUser(id) {
    console.log(id);
    axios
      .post(`${BASE_URL}/profileadmin/user/${id}`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res);
        // setOpen(true);
        // setNotification("User Deleted SuccessFully!");
        getUsers();
        alert("User Deleted");
      })
      .catch(error => {
        console.log(error);

        // setOpen(true);
        // setNotification("Error Occured While Deleting User");
      });
  }

  console.log(error);

  if (users.length === 0 && error === false) {
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
  } else if (users.length === 0 && error === true) {
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
              <StyledTableCell align="right">ProfileName</StyledTableCell>

              {/* <StyledTableCell align="right">ProfileName</StyledTableCell> */}
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(row => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.profileId.name}
                </StyledTableCell>

                {/* <StyledTableCell align="right">{row.profile}</StyledTableCell> */}
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => deleteUser(row._id)}
                    variant="contained"
                    color="secondary"
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
