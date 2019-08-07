import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import DashboardView from "../../views/SuperAdminViews/DashboardView/DashboardView.jsx";
import OrganizationsView from "../../views/SuperAdminViews/OrganizationsView/OrganizationsView.jsx";
import RequestView from "../../views/SuperAdminViews/RequestView/RequestView.jsx";
import SalestaxView from "../../views/SuperAdminViews/SalestaxView/SalestaxView.jsx";
import CreateCityView from "../../views/SuperAdminViews/CreateCityView/CreateCityView.jsx";
import CreateOrganizationView from "../../views/SuperAdminViews/CreateOrganizationView/CreateOrganizationView.jsx";
import CreateCategoryView from "../../views/SuperAdminViews/CreateCategoryView/CreateCategoryView.jsx";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import Request from "@material-ui/icons/RecordVoiceOver";
import Salestax from "@material-ui/icons/LibraryBooks";
import CreateOrganization from "@material-ui/icons/Create";
import CreateCity from "@material-ui/icons/LocationCity";
import CreateCategory from "@material-ui/icons/Category";

import axios from "axios";

export default function Dashboard(props) {
  const listitemnames = [
    "dashboard",
    "organizations",
    "request",
    "salestax",
    "createorganization",
    "createcity",
    "createcategory"
  ];

  const icons = [
    <DashboardIcon />,
    <PeopleIcon />,
    <Request />,
    <Salestax />,
    <CreateOrganization />,
    <CreateCity />,
    <CreateCategory />
  ];

  const loggedIn = localStorage.getItem("loggedIn"); //this state stays in Redux
  const token = localStorage.getItem("token");

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
    organizations: <OrganizationsView token={token} />,
    request: <RequestView token={token} />,
    salestax: <SalestaxView token={token} />,
    createorganization: <CreateOrganizationView token={token} />,
    createcity: <CreateCityView token={token} />,
    createcategory: <CreateCategoryView token={token} />
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
        pending={pending}
      />
    );
  }
}
