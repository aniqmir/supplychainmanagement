import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import AddProduct from "./AddProduct/AddProduct.jsx";
import AllProducts from "./AllProducts/AllProducts.jsx";
import UpdateProducts from "./UpdateProducts/UpdateProducts.jsx";
// import DeleteUser from "./DeleteUser/DeleteUser.jsx";
// import UpdateUser from "./UpdateUser/UpdateUser.jsx";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

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
          <Tab label="Add Product" {...a11yProps(0)} />
          <Tab label="All Products" {...a11yProps(1)} />
          <Tab label="Update Products" {...a11yProps(1)} />
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
          <AddProduct token={props.token}/>
        </TabPanel>
       <TabPanel value={value} index={1} dir={theme.direction}>
          <AllProducts token={props.token}/>
        </TabPanel>
       <TabPanel value={value} index={2} dir={theme.direction}>
          <UpdateProducts token={props.token}/>
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
