import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import Login from "./layouts/Login/Login.jsx";
import SuperAdmin from "./layouts/SuperAdmin/SuperAdmin.jsx";

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
          {/* <Route exact path="/locations" component={SuperAdmin} /> */}
          <Route exact path="/categories" component={SuperAdmin} />
        </div>
      );
    } else if (type === "Profileadmin") {
      return (
        <div>
          <Route exact path="/dashboard" component={ProfileAdmin} />
          <Route exact path="/usermanagement" component={ProfileAdmin} />
          <Route exact path="/marketplace" component={ProfileAdmin} />
          <Route exact path="/inventory" component={ProfileAdmin} />
          <Route exact path="/location" component={ProfileAdmin} />
          <Route exact path="/category" component={ProfileAdmin} />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }

  return (
    <Router history={customHistory}>
      <Route exact path="/" component={Login} />
      {routestoRender()}
    </Router>
  );
}

export default CustomRoutes;
