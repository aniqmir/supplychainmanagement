import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import axios from "axios";

import { BASE_URL } from "../../../../baseurl.js";

export default function ResponsiveDialog(props) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [errorText, setErrorText] = React.useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/superadmin/profile/users/${props.data._id}`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          console.log(res.data.data.users);
          setData(res.data.data.users);
          setLoading(false);
          setErrorText("");
        }
      })
      .catch(error => {
        setErrorText(error.response["data"]["Error"]["message"]);
        setLoading(false);
      });
  }, [props.data._id, props.token]);
  if (data.length > 0) {
    return (
      <div>
        <Dialog
          open={props.open}
          onClose={() => props.handleClose()}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          <DialogTitle id="responsive-dialog-title">
            <Grid container spacing={0} justify="center" alignItems="center">
              <Grid item xs={11}>
                Username: <b>{props.data.username}</b>
              </Grid>
              <Grid item xs={1}>
                <img
                  src={
                    "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png"
                  }
                  alt="N/A"
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "100px"
                  }}
                />
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Surname</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Designation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.surname}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.designation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={() => props.handleClose()} color="primary">
              Disagree
            </Button> */}
            <Button
              onClick={() => props.handleClose()}
              color="primary"
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else if (loading) {
    return (
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="responsive-dialog-title"
      >
        <div
          style={{
            width: "200px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "10% 0",
            minHeight: "200px"
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="responsive-dialog-title"
      >
        {errorText}
        <DialogActions>
          {/* <Button onClick={() => props.handleClose()} color="primary">
            Disagree
          </Button> */}
          <Button onClick={() => props.handleClose()} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
