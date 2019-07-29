import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

import IndividualProfile from "./IndividualProfile/IndividualProfile.jsx";

const data = [
  {
    name: "name1",
    surname: "surname1",
    username: "username1",
    email: "email1",
    location: "location1",
    city: "city1",
    designation: "designation1",
    phone: "phone1",
    displaypicture:
      "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png"
  },
  {
    name: "name2",
    surname: "surname2",
    username: "username2",
    email: "email2",
    location: "location2",
    city: "city2",
    designation: "designation2",
    phone: "phone2",
    displaypicture:
      "https://cdn2.vectorstock.com/i/1000x1000/25/31/user-icon-businessman-profile-man-avatar-vector-10552531.jpg"
  },
  {
    name: "name3",
    surname: "surname3",
    username: "username3",
    email: "email3",
    location: "location3",
    city: "city3",
    designation: "designation3",
    phone: "phone3",
    displaypicture: "https://uifaces.co/images/man.svg"
  },
  {
    name: "name4",
    surname: "surname4",
    username: "username4",
    email: "email4",
    location: "location4",
    city: "city4",
    designation: "designation4",
    phone: "phone4",
    displaypicture:
      "https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/user_man_male_profile_account-512.png"
  }
];

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
  }
}));

export default function Profiles(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [iData, setData] = React.useState("");

  function handleClickOpen(temp) {
    setData(temp);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

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
                    <Avatar alt="Remy Sharp" src={type.displaypicture} />
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
                          type.designation}
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
        <IndividualProfile data={iData} open={open} handleClose={handleClose} />
      ) : null}
    </List>
  );
}
