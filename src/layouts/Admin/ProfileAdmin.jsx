import React from "react";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

export default function Admin(props) {
  const loggedIn = localStorage.getItem("loggedIn"); //this state stays in Redux
  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");

  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  function openProfile() {
    console.log('profile opened');
  }

  if (!loggedIn && token.length === 0) {
    return <Redirect to="/" />;
  } else if (loggedIn && token.length !== 0 && type === "Profileadmin") {
    return (
      <div>
        <Button onClick={() => openProfile()}>Profile</Button>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  }
}
