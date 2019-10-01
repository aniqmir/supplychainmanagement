import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

import DashboardView from "../../views/ProfileAdminViews/DashboardView/DashboardView.jsx";
import UserManagementView from "../../views/ProfileAdminViews/UserManagementView/UserManagementView.jsx";
import MarketPlaceView from "../../views/ProfileAdminViews/MarketplaceView/MarketplaceView.jsx";
import InventoryView from "../../views/ProfileAdminViews/InventoryView/InventoryView.jsx";
import LocationView from "../../views/ProfileAdminViews/LocationView/LocationView.jsx";
import CategoryView from "../../views/ProfileAdminViews/CategoryView/CategoryView.jsx";

import DashboardIcon from "@material-ui/icons/Dashboard";
import UserManagementIcon from "@material-ui/icons/SupervisorAccount";
import MarketplaceIcon from "@material-ui/icons/ShoppingCart";
import InventoryIcon from "@material-ui/icons/AccountBalance";
import LocationIcon from "@material-ui/icons/LocationCity";
import CateogoryIcon from "@material-ui/icons/Category";

import axios from "axios";

export default function Dashboard(props) {
  const listitemnames = [
    "dashboard",
    "usermanagement",
    "marketplace",
    "inventory",
    "location",
    "category"
  ];

  const icons = [
    <DashboardIcon />,
    <UserManagementIcon />,
    <MarketplaceIcon />,
    <InventoryIcon />,
    <LocationIcon />,
    <CateogoryIcon />
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
    inventory: <InventoryView token={token} setPending={setPending} />,
    location: <LocationView token={token} setPending={setPending} />,
    category: <CategoryView token={token} setPending={setPending} />,
    usermanagement: <UserManagementView token={token} setPending={setPending} />
  };

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
