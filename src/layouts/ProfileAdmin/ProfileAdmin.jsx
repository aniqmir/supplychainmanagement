import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

import DashboardView from "../../views/ProfileAdminViews/DashboardView/DashboardView.jsx";
import UserManagementView from "../../views/ProfileAdminViews/UserManagementView/UserManagementView.jsx";
import MarketPlaceView from "../../views/ProfileAdminViews/MarketplaceView/MarketplaceView.jsx";

import DashboardIcon from "@material-ui/icons/Dashboard";
import UserManagementIcon from "@material-ui/icons/Dashboard";
import MarketplaceIcon from "@material-ui/icons/Dashboard";

import axios from "axios";

export default function Dashboard(props) {
  const listitemnames = ["dashboard", "usermanagement", "marketplace"];

  const icons = [
    <DashboardIcon />,
    <UserManagementIcon />,
    <MarketplaceIcon />
  ];

  const loggedIn = localStorage.getItem("loggedIn"); //this state stays in Redux
  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");

  const pathname = props.location.pathname.split("/");
  const viewname = pathname[1];

  const [pending, setPending] = React.useState(0);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
    }
  });

  const view = {
    dashboard: <DashboardView token={token} setPending={setPending} />,
    marketplace: <MarketPlaceView token={token} setPending={setPending} />,
    usermanagement: <UserManagementView token={token} setPending={setPending} />
  };

  console.log(type);

  if (!loggedIn || token.length === 0) {
    return <Redirect to="/" />;
  } else if (loggedIn && token.length !== 0 && type === "Profileadmin") {
    return (
      <Sidebar
        history={props.history}
        listitemnames={listitemnames}
        icon={icons}
        path={pathname[1]}
        view={view[viewname]}
        heading={"Profile Admin"}
        pending={pending}
      />
    );
  }
}
