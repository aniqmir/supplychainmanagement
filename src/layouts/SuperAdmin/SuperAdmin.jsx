import React from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import DashboardView from "../../views/SuperAdminViews/DashboardView/DashboardView.jsx";
import ProfilesView from "../../views/SuperAdminViews/ProfilesView/ProfilesView.jsx";
import RequestView from "../../views/SuperAdminViews/RequestView/RequestView.jsx";
import SalestaxView from "../../views/SuperAdminViews/SalestaxView/SalestaxView.jsx";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import Request from "@material-ui/icons/RecordVoiceOver";
import Salestax from "@material-ui/icons/LibraryBooks";

export default function Dashboard(props) {
  const listitemnames = ["dashboard", "profiles", "request", "salestax"];

  const icons = [<DashboardIcon />, <PeopleIcon />, <Request />, <Salestax />];

  const loggedIn = localStorage.getItem("loggedIn"); //this state stays in Redux
  const token = localStorage.getItem("token");

  const pathname = props.location.pathname.split("/");
  const viewname = pathname[1];

  const view = {
    dashboard: <DashboardView token={token} />,
    profiles: <ProfilesView token={token} />,
    request: <RequestView token={token} />,
    salestax: <SalestaxView token={token} />
  };

  if (!loggedIn || token.length === 0) {
    return <Redirect to="/" />;
  } else if (loggedIn && token.length !== 0) {
    return (
      <Sidebar
        history={props.history}
        listitemnames={listitemnames}
        icon={icons}
        path={pathname[1]}
        view={view[viewname]}
        heading={"Super Admin"}
      />
    );
  }
}
