import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import Login from "./layouts/Login/Login.jsx";
import Signup from "./layouts/Signup/Signup.jsx";
import SuperAdmin from "./layouts/SuperAdmin/SuperAdmin.jsx";
import LocationUser from "./layouts/LocationUser/LocationUser.jsx";
import LocationManager from "./layouts/LocationManager/LocationManager.jsx";
import InventoryManager from "./layouts/InventoryManager/InventoryManager.jsx";
import ProcurementManager from "./layouts/ProcurementManager/ProcurementManager.jsx";
import ProfileAdmin from "./layouts/ProfileAdmin/ProfileAdmin.jsx";

const customHistory = createBrowserHistory();

const type = localStorage.getItem("type"); //update when user logs in;

function CustomRoutes() {
  function routestoRender() {
    if (type === "Superadmin") {
      return (
        <div>
          <Route exact path="/dashboard" component={SuperAdmin} />
          <Route exact path="/organizations" component={SuperAdmin} />
          <Route exact path="/request" component={SuperAdmin} />
          <Route exact path="/salestax" component={SuperAdmin} />
          <Route exact path="/createorganization" component={SuperAdmin} />
          <Route exact path="/locations" component={SuperAdmin} />
          <Route exact path="/categories" component={SuperAdmin} />
          <Route exact path="/suspended" component={SuperAdmin} />
        </div>
      );
    } else if (type === "Profileadmin") {
      return (
        <div>
          <Route exact path="/dashboard" component={ProfileAdmin} />
          <Route exact path="/usermanagement" component={ProfileAdmin} />
          <Route
            exact
            path="/usermanagement/adduser"
            component={ProfileAdmin}
          />
          <Route
            exact
            path="/usermanagement/allusers"
            component={ProfileAdmin}
          />
          <Route exact path="/marketplace" component={ProfileAdmin} />
          <Route exact path="/inventory" component={ProfileAdmin} />
          <Route exact path="/location" component={ProfileAdmin} />
          <Route exact path="/category" component={ProfileAdmin} />
        </div>
      );
    }else if (type === "Locationuser") {
      return (
        <div>
          <Route exact path="/dashboard" component={LocationUser} />
          <Route exact path="/orders" component={LocationUser} />
          <Route exact path="/profileinventory" component={LocationUser} />
          <Route exact path="/locationinventory" component={LocationUser} />
        </div>
      );
    }else if (type === "Locationmanager") {
      return (
        <div>
          <Route exact path="/dashboard" component={LocationManager} />
          <Route exact path="/requests" component={LocationManager} />
          {/* <Route exact path="/inventory" component={LocationManager} /> */}
          <Route exact path="/approvedorders" component={LocationManager} />
          <Route exact path="/rejectedorders" component={LocationManager} />
        </div>
      );
    }else if (type === "Inventorymanager") {
      return (
        <div>
          <Route exact path="/dashboard" component={InventoryManager} />
          <Route exact path="/requests" component={InventoryManager} />
          {/* <Route exact path="/inventory" component={InventoryManager} /> */}
          <Route exact path="/approvedorders" component={InventoryManager} />
          <Route exact path="/rejectedorders" component={InventoryManager} />
        </div>
      );
    }else if (type === "Procurementmanager") {
      return (
        <div>
          <Route exact path="/dashboard" component={ProcurementManager} />
          <Route exact path="/marketplace" component={ProcurementManager} />
          <Route exact path="/profileinventory" component={ProcurementManager} />
        </div>
      );
    }
     else {
      return <Redirect to="/" />;
    }
  }

  return (
    <Router history={customHistory}>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      {routestoRender()}
    </Router>
  );
}

export default CustomRoutes;
