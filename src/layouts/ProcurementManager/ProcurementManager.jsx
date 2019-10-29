import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import DashboardView from "../../views/ProcurementManagerViews/DashboardView/DashboardView";
import StockView from "../../views/ProcurementManagerViews/StockView/StockView";


import DashboardIcon from "@material-ui/icons/Dashboard";
import MarketplaceIcon from "@material-ui/icons/ShoppingCart";

import axios from "axios";

export default function Dashboard(props) {
  const listitemnames = [
    "dashboard",
    "stock"
  ];

  const icons = [
    <DashboardIcon />,
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
    stock: <StockView token={token} setPending={setPending} />
  };

  if (!loggedIn || token.length === 0) {
    return <Redirect to="/" />;
  } else if (loggedIn && token.length !== 0 && type === "Procurementmanager") {
    return (
      <Sidebar
        history={props.history}
        token={token}
        listitemnames={listitemnames}
        icon={icons}
        path={pathname[1]}
        view={view[viewname]}
        heading={"Procurement Manager"}
        pending={pending}
      />
    );
  }
}
