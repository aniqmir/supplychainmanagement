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
import axios from "axios";

import IndividualProfile from "./IndividualProfile/IndividualProfile.jsx";

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
  const [errorText, setErrorText] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [iData, setIData] = React.useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/superadmin/profile/filter/true`)
      .then(res => {
        setData(res.data["data"]["profiles"]);
        setLoading(false);
        setErrorText("");
      })
      .catch(error => {
        setErrorText(error.response["data"]["Error"]["message"]);
        setLoading(false);
      });
  }, [props.token]);

  function handleClickOpen(temp) {
    setIData(temp);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  if (data.length > 0) {
    return (
      <List className={classes.root}>
        <Grid container spacing={1}>
          {data.map((type, key) => {
            return (
              <Grow in={true} key={key} timeout={1000 * (key + 1)}>
                <Grid item xs={12}>
                  {/* <Button onClick={() => console.log(type)}>Click</Button> */}
                  <ListItem
                    className={classes.listItem}
                    alignItems="flex-start"
                    key={key}
                    button
                    onClick={() => handleClickOpen(type)}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={type.image} />
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
                            type.city +
                            " — " +
                            type.phone}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Grid>
              </Grow>
            );
          })}
        </Grid>
        {open ? (
          <IndividualProfile
            data={iData}
            open={open}
            handleClose={handleClose}
          />
        ) : null}
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
