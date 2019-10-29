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
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

import Order from "./Order";
import Notification from "../../../components/Notification/Notification";

import { BASE_URL } from "../../../baseurl"; //baseurl

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    // backgroundColor: theme.palette.background.paper,
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

export default function Requests(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  // const [data, setData] = React.useState({});
  const [errorText, setErrorText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");


  const data = [
    {
      name: "item123",
      price: 12000,
      ownerEmail: "manager1@gmail.com"
    },
    {
      name: "item789",
      price: 12000,
      ownerEmail: "manager2@gmail.com"
    },
    {
      name: "item456",
      price: 12000,
      ownerEmail: "manager3@gmail.com"
    }
  ]
  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/superadmin/profile/filter/false`, {
  //       headers: { Authorization: `bearer ` + props.token }
  //     })
  //     .then(res => {
  //       setData(res.data["data"]["profiles"]);
  //       setLoading(false);
  //       setErrorText("");
  //     })
  //     .catch(error => {
  //       setErrorText(error.response["data"]["Error"]["message"]);
  //       setLoading(false);
  //     });
  // }, [props.token]);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  //   function update() {
  //     axios
  //     .get(`${BASE_URL}/superadmin/profile/filter/false`, {
  //       headers: { Authorization: `bearer ` + props.token }
  //     })
  //     .then(res => {
  //       setData(res.data["data"]["profiles"]);
  //       setLoading(false);
  //       setErrorText("");
  //     })
  //     .catch(error => {
  //       console.log('catch');
  //       console.log(error.response);
  //       console.log(error.response.data.Error);
  //       setErrorText(error.response["data"]["Error"]["message"]);
  //       setLoading(false);
  //     });
  // }


  // function approve(type) {
  //   axios
  //     .patch(`${BASE_URL}/superadmin/profile/approve/${type._id}`)
  //     .then(res => {
  //       console.log(res);
  //       window.location.reload();
  //       setNotification(
  //         "Profile Approved Successfully! View it in the Profiles Section"
  //       );
  //       setOpen(true);
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //       setErrorText(error.response["data"]["Error"]["message"]);
  //       setLoading(false);
  //       setNotification("An Error Occured while approving Profile");
  //       setOpen(true);
  //     });
  // }

  // function deleteprofile(type) {
  //   axios
  //     .delete(`${BASE_URL}/superadmin/profile/${type._id}`)
  //     .then(res => {
  //       console.log(res);
  //       window.location.reload();
  //       setNotification("Profile Rejected Successfully!");
  //       setOpen(true);
  //     })
  //     .catch(errorA => {
  //       console.log(errorA.response);
  //       // alert(error.data.Error.message);
  //       setNotification("An Error occured while rejecting profile");
  //       setOpen(true);
  //     });
  // }

  if (data.length > 0) {
    return (
      <List className={classes.root}>
        <Grid container spacing={1}>
          {data.map((type, key) => {
            return (
              <Grow in={true} key={key} timeout={750 * (key + 1)}>
                <Grid item xs={12}>
                  <ListItem
                    className={classes.listItem}
                    alignItems="flex-start"
                    key={key}
                  //   button
                  //   onClick={() => console.log(type)}
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
                      primary={type.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {type.ownerEmail}
                          </Typography>
                           {" — $" +
                            type.price} 
                            {/* // " — " +
                            // type.city +
                            // " — " +
                            // type.phone} */}
                        </React.Fragment>
                      }
                    />
                    <div style={{ paddingTop: "1%" }}>
                      <Order token={props.token} data={type}/>
                    </div>
                  </ListItem>
                </Grid>
              </Grow>
            );
          })}
        </Grid>
        <Notification
          open={open}
          handleClose={handleClose}
          notification={notification}
        />
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
