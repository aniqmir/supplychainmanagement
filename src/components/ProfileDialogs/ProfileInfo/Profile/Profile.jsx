import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import MailOutline from "@material-ui/icons/MailOutline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ProfileTable from "./profileTable";
import Notification from "../../../Notification/Notification";
import axios from "axios";
import { BASE_URL } from "../../../../baseurl"; //baseurl

const useStyles = makeStyles(theme => ({
  name: {
    marginLeft: "43%",
    marginTop: "1%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "40%"
    }
  },
  location: {
    marginLeft: "45%",
    marginTop: "2%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "42%"
    }
  },
  mailIcon: {
    marginLeft: "25%",
    marginTop: "1%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "22%"
    }
  },
  mailIconSize: {
    width: "50px",
    height: "30px",
    [theme.breakpoints.down("md")]: {
      width: "40px",
      height: "25px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "30px",
      height: "20px"
    }
  },
  text: {
    marginLeft: "20%",
    marginTop: "1%",
    marginRight: "20%"
  },
  avatar: {
    width: 110,
    height: 110,
    marginLeft: "45%",
    marginTop: "3%",
    [theme.breakpoints.down("md")]: {
      height: 90,
      width: 90
    },
    [theme.breakpoints.down("sm")]: {
      height: 70,
      width: 70
    }
  }
}));

//dialog for planner button
export default function ResponsiveDialog(props) {
  const classes = useStyles();

  const [errorText, setErrorText] = React.useState("");
  const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profileadmin/profile`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res.data.data.newUser);
        setData(res.data["data"]["newUser"]);
        setErrorText("");
      })
      .catch(error => {
        setErrorText(error.response["data"]["Error"]["message"]);
      });
  }, [props.token]);

  function becomeSupplier() {
    axios
      .get(`${BASE_URL}/profileadmin/profile/supplier`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res.data);
        setOpen(true);
        setNotification("You are now a supplier");
      })
      .catch(error => {
        setErrorText(error.response["data"]["Error"]["message"]);
        setOpen(true);
        setNotification("Can't be a supplier");
      });
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Avatar
            alt="Remy Sharp"
            src={
              "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png"
            }
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={12} className={classes.name}>
          <b style={{ fontSize: "29px" }}>{data.name}</b>({data.username})
        </Grid>
        <Grid item xs={12} className={classes.location}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginBottom: "20px", marginLeft: "-20px" }}
            onClick={() => becomeSupplier()}
          >
            <b>Become A Supplier</b>
          </Button>
        </Grid>
        <ProfileTable data={data} />
      </Grid>
      <Notification
        open={open}
        handleClose={handleClose}
        notification={notification}
      />
    </div>
  );
}
