import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

// import DashboardView from "../../views/LocationUserViews/DashboardView/DashboardView.jsx";
import OrdersView from "../../views/LocationUserViews/OrdersView/OrdersView.jsx";
import ProfileInventoryView from "../../views/LocationUserViews/ProfileInventoryView/ProfileInventoryView.jsx";
// import LocationInventoryView from "../../views/LocationUserViews/LocationInventoryView/LocationInventoryView.jsx";


// import DashboardIcon from "@material-ui/icons/Dashboard";
import MarketplaceIcon from "@material-ui/icons/ShoppingCart";
import InventoryIcon from "@material-ui/icons/AccountBalance";

import axios from "axios";

export default function Dashboard(props) {
  const listitemnames = [
    // "dashboard",
    "orders",
    "profileinventory"
    // "locationinventory"
  ];

  const icons = [
    // <DashboardIcon />,
    <MarketplaceIcon />,
    <InventoryIcon />
    // <InventoryIcon />
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
    // dashboard: <DashboardView token={token} setPending={setPending} />,
    orders: <OrdersView token={token} setPending={setPending} />,
    profileinventory: <ProfileInventoryView token={token} setPending={setPending} />
    // locationinventory: <LocationInventoryView token={token} setPending={setPending} />
  };

  if (!loggedIn || token.length === 0) {
    return <Redirect to="/" />;
  } else if (loggedIn && token.length !== 0 && type === "Locationuser") {
    return (
      <Sidebar
        history={props.history}
        token={token}
        listitemnames={listitemnames}
        icon={icons}
        path={pathname[1]}
        view={view[viewname]}
        heading={"Location User"}
        pending={pending}
      />
    );
  }
}
