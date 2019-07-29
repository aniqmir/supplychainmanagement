import React from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import DashboardView from "../../views/DashboardView/DashboardView.jsx";
import ProfilesView from "../../views/ProfilesView/ProfilesView.jsx";
import RequestView from "../../views/RequestView/RequestView.jsx";
import SalestaxView from "../../views/SalestaxView/SalestaxView.jsx";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import Request from "@material-ui/icons/RecordVoiceOver";
import Salestax from "@material-ui/icons/LibraryBooks";

export default function Dashboard(props) {
  const listitemnames = ["dashboard", "profiles", "request", "salestax"];

  const icons = [<DashboardIcon />, <PeopleIcon />, <Request />, <Salestax />];

  const view = {
    dashboard: <DashboardView />,
    profiles: <ProfilesView />,
    request: <RequestView />,
    salestax: <SalestaxView />
  };

  const loggedIn = localStorage.getItem("loggedIn"); //this state stays in Redux

  const pathname = props.location.pathname.split("/");
  const viewname = pathname[1];

  if (!loggedIn) {
    return <Redirect to="/" />;
  } else if (loggedIn) {
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
