import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import AddUser from "./AddUser/AddUser";
import AllUsers from "./AllUsers/AllUsers";

// import DeleteUser from "./DeleteUser/DeleteUser.jsx";
// import UpdateUser from "./UpdateUser/UpdateUser.jsx";
import axios from "axios";

import { BASE_URL } from "../../../baseurl";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [locations, setLocations] = React.useState([]);
  // const [users, setUsers] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  console.log(props.history);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/profileadmin/location/get`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setLocations(res.data["data"]["locations"]);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }, [props.token]);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/profileadmin/user`, {
  //       headers: { Authorization: `bearer ` + props.token }
  //     })
  //     .then(res => {
  //       if (res.data.success === true) {
  //         setUsers(res.data["data"]["users"]);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [props.token]);

  // function getUsers() {
  //   axios
  //     .get(`${BASE_URL}/profileadmin/user`, {
  //       headers: { Authorization: `bearer ` + props.token }
  //     })
  //     .then(res => {
  //       if (res.data.success === true) {
  //         setUsers(res.data["data"]["users"]);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Add User" {...a11yProps(0)} />
          <Tab label="All Users" {...a11yProps(1)} />
          {/* <Tab label="Delete User" {...a11yProps(2)} />
          <Tab label="Update User" {...a11yProps(3)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AddUser locations={locations} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <AllUsers token={props.token} />
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          <DeleteUser />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <UpdateUser />
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}
