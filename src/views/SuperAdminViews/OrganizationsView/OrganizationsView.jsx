import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import axios from "axios";

import IndividualProfile from "./IndividualOrganization/IndividualOrganization.jsx";
import Notification from "../../../components/Notification/Notification.jsx";

// import MaterialTable from "material-table";

import { BASE_URL } from "../../../baseurl.js"; //baseurl

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    // backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  listItem: {
    padding: "20px",
    boxShadow: "0 .5rem 1rem rgba(0,0,0,0.15)"
  },
  progress: {
    paddingLeft: "50%",
    paddingTop: "25%"
  }
}));

export default function Profiles(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openNot, setOpenNot] = React.useState(false);
  const [notification, setNotification] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [iData, setIData] = React.useState("");
  // const [
  //   state
  //   // setState
  // ] = React.useState({
  //   columns: [
  //     { title: "Name", field: "name" },
  //     { title: "Username", field: "username" },
  //     { title: "City", field: "city" },
  //     { title: "Email", field: "email", type: "string" },
  //     { title: "Phone", field: "phone", type: "string" },
  //     { title: "Salestax", field: "salestax", type: "numeric" }
  //   ]
  // });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/superadmin/profile`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res.data.data.profiles);
        setData(res.data["data"]["profiles"]);
        setLoading(false);
        setErrorText("");
      })
      .catch(error => {
        setErrorText(error.response["data"]["Error"]["message"]);
        setLoading(false);
      });
  }, [props.token]);

  function update() {
    console.log("update");
    axios
      .get(`${BASE_URL}/superadmin/profile`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        setData(res.data["data"]["profiles"]);
        setLoading(false);
        setErrorText("");
      })
      .catch(error => {
        setErrorText(error.response["data"]["Error"]["message"]);
        setLoading(false);
      });
  }

  function handleClickOpen(temp) {
    setIData(temp);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleCloseNot() {
    setOpenNot(false);
  }

  function deleteprofile(type) {
    axios
      .delete(`${BASE_URL}/superadmin/profile/${type._id}`)
      .then(res => {
        console.log(res);
        update();
        setNotification("Profile Deleted Successfully!");
        setOpenNot(true);
      })
      .catch(errorA => {
        console.log(errorA.response);
        setNotification("An Error occured while deleting profile");
        setOpenNot(true);
      });
  }

  function suspendprofile(type) {
    axios
      .patch(`${BASE_URL}/superadmin/profile/suspend/${type._id}`)
      .then(res => {
        console.log(res);
        update();
        setNotification("Profile Suspended Successfully!");
        setOpenNot(true);
      })
      .catch(errorA => {
        console.log(errorA.response);
        // alert(error.data.Error.message);
        setNotification("An Error occured while rejecting profile");
        setOpenNot(true);
      });
  }

  if (data.length > 0) {
    return (
      <List className={classes.root}>
        <Grid container spacing={1}>
          {data.map((type, key) => {
            return (
              <Grow in={true} key={key} timeout={750 * (key + 1)}>
                <Grid item xs={12}>
                  {/* <Button onClick={() => console.log(type)}>Click</Button> */}
                  <ListItem
                    className={classes.listItem}
                    alignItems="flex-start"
                    key={key}
                  // button
                  // onClick={() => handleClickOpen(type)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png"
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={type.surname}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {type.email}
                          </Typography>
                          {" — " +
                            type.name +
                            " — " +
                            type.phone
                            // (type.city === "undefined" ? "" : type.city)  +
                            // " — " +
                            // type.phone !== "undefined" ? type.phone : ""
                          }
                        </React.Fragment>
                      }
                    />
                    <div style={{ marginTop: "1%" }}>
                      Created At: {type.createdAt.slice(0, 10)} &nbsp;
                    </div>
                    <div style={{ paddingTop: "0.5%" }}>
                      {/* <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ marginRight: "10px", marginTop: "5px" }}
                        // onClick={() => handleClickOpen(type)}
                      >
                        View
                      </Button> */}
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ marginRight: "10px", marginTop: "5px" }}
                        onClick={() => suspendprofile(type)}
                      >
                        Suspend
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ marginTop: "5px" }}
                        onClick={() => deleteprofile(type)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListItem>
                  <Notification
                    open={openNot}
                    handleClose={handleCloseNot}
                    notification={notification}
                  />
                </Grid>
              </Grow>
            );
          })}
        </Grid>
      </List>
    );
  } else if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  } else {
    return (
      <Grow in={true} timeout={500}>
        <Typography variant="h5">{errorText}</Typography>
      </Grow>
    );
  }
}
