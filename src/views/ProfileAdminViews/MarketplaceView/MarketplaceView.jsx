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
  const [loading, setLoading] = React.useState(true);
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
          console.log(res.data.data.Item);
          setItems(res.data["data"]["Item"]);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [props.token]);

  function getItems() {
    axios
      .get(`${BASE_URL}/profileadmin/marketplace/get/items`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setItems(res.data["data"]["Item"]);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }

  function deleteItem(id) {
    console.log(id);
    axios
      .post(`${BASE_URL}/profileadmin/user/${id}`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res);
        // setOpen(true);
        // setNotification("User Deleted SuccessFully!");
        getItems();
        alert("Item Deleted");
      })
      .catch(error => {
        console.log(error);

        // setOpen(true);
        // setNotification("Error Occured While Deleting User");
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
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">ProfileEmail</StyledTableCell>

                {/* <StyledTableCell align="right">ProfileName</StyledTableCell> */}
                <StyledTableCell align="right">profileName</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(row => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.profileId !== null ? row.profileId.email : "Nill"}
                    {/* <IconButton
                      onClick={() => deleteItem(row._id)}
                      variant="contained"
                      color="secondary"
                      disabled
                    >
                      <Delete />
                    </IconButton> */}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.profileId !== null ? row.profileId.name : "Nill"}
                  </StyledTableCell>

                  {/* <StyledTableCell align="right">{row.profile}</StyledTableCell> */}
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
        <h5>No Items...</h5>
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
