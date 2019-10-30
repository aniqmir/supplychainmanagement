import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import DashboardView from "../../views/LocationManagerViews/DashboardView/DashboardView";
import RequestsView from "../../views/LocationManagerViews/RequestsView/RequestsView";
import InventoryView from "../../views/LocationManagerViews/InventoryView/InventoryView";
import ApprovedOrdersView from "../../views/LocationManagerViews/ApprovedOrdersView/ApprovedOrdersView";
import RejectedOrdersView from "../../views/LocationManagerViews/RejectedOrdersView/RejectedOrdersView";


import DashboardIcon from "@material-ui/icons/Dashboard";
import MarketplaceIcon from "@material-ui/icons/ShoppingCart";
import InventoryIcon from "@material-ui/icons/AccountBalance";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import axios from "axios";

export default function Dashboard(props) {
  const listitemnames = [
    "dashboard",
    "requests",
    "inventory",
    "approvedorders",
    "rejectedorders"
  ];

  const icons = [
    <DashboardIcon />,
    <MarketplaceIcon />,
    <InventoryIcon />,
    <CheckCircleIcon />,
    <CancelIcon />
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
    requests: <RequestsView token={token} setPending={setPending} />,
    inventory: <InventoryView token={token} setPending={setPending} />,
    approvedorders: <ApprovedOrdersView token={token} setPending={setPending} />,
    rejectedorders: <RejectedOrdersView token={token} setPending={setPending} />
  };

  if (!loggedIn || token.length === 0) {
    return <Redirect to="/" />;
  } else if (loggedIn && token.length !== 0 && type === "Locationmanager") {
    return (
      <Sidebar
        history={props.history}
        token={token}
        listitemnames={listitemnames}
        icon={icons}
        path={pathname[1]}
        view={view[viewname]}
        heading={"Location Manager"}
        pending={pending}
      />
    );
  }
}
