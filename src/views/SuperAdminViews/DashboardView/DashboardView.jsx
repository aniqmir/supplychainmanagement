import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
// import Card from "../../../components/Card/Card.jsx";
import Grow from "@material-ui/core/Grow";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

import { BASE_URL } from "../../../baseurl.js";
import Clock from "react-live-clock";
import { Typography } from "@material-ui/core";

// const data1 = [
//   {
//     image:
//       "http://www.capitalmarket.com/IImages/technical-financial-graph-on-technology-abstract-background_stock-exchange.jpeg",
//     title: "Graph1",
//     description: "Lorem Ipsum"
//   },
//   {
//     image:
//       "http://www.capitalmarket.com/IImages/technical-financial-graph-on-technology-abstract-background_stock-exchange.jpeg",
//     title: "Graph2",
//     description: "Lorem Ipsum"
//   },
//   {
//     image:
//       "http://www.capitalmarket.com/IImages/technical-financial-graph-on-technology-abstract-background_stock-exchange.jpeg",
//     title: "Graph3",
//     description: "Lorem Ipsum"
//   }
// ];
export default function Dashboard(props) {
  const [total, settotal] = React.useState("");
  const [accepted, setaccepted] = React.useState("");
  const [pending, setpending] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  // const [errorText, setErrorText] = React.useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/superadmin/profile`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        console.log(res.data.data.ProfilesCount);
        settotal(res.data.data.ProfilesCount.total);
        setpending(res.data.data.ProfilesCount.pending);
        setaccepted(res.data.data.ProfilesCount.accepted);
        // props.setPending(res.data.data.ProfilesCount.pending);
        setLoading(false);
        // setErrorText("");
      })
      .catch(error => {
        // setErrorText(error.response["data"]["Error"]["message"]);
        setLoading(false);
      });
  }, [props]);

  if (loading) {
    return (
      <div style={{ paddingLeft: "50%", paddingTop: "25%" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  } else {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <h3>
            <Clock
              format={" h:mm:ss/dddd, MMMM Do, YYYY"}
              ticking={true}
              // timezone={"US/Pacific"}
            />
          </h3>
        </Grid>
        <Grow in={true}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h4">
              Total Profiles:&nbsp;<b>{total}</b>
            </Typography>
            <Typography variant="h4">
              Pending Profiles:&nbsp;<b>{pending}</b>
            </Typography>
            <Typography variant="h4">
              Accepted Profiles:&nbsp;<b>{accepted}</b>
            </Typography>
          </Grid>
        </Grow>
        {/* {data1.map((type, key) => {
          return (
            <Grow in={true} key={key} timeout={1000 * (key + 1)}>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  image={type.image}
                  title={type.title}
                  description={type.description}
                />
              </Grid>
            </Grow>
          );
        })} */}
      </Grid>
    );
  }
}
