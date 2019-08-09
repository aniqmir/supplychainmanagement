import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
// import Card from "../../../components/Card/Card.jsx";
import Grow from "@material-ui/core/Grow";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

import { BASE_URL } from "../../../baseurl.js";
import Clock from "react-live-clock";
import { Typography } from "@material-ui/core";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

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

  const data = [
    {
      name: "Total",
      total: total,
      organizations: total,
      amt: 1000
    },
    {
      name: "Accepeted",
      total: total,
      organizations: accepted,
      amt: 1000
    },
    {
      name: "Pending",
      total: total,
      organizations: pending,
      amt: 1000
    }
  ];

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
              Total Organizations:&nbsp;<b>{total}</b>
            </Typography>
            <Typography variant="h4">
              Pending Organizations:&nbsp;<b>{pending}</b>
            </Typography>
            <Typography variant="h4">
              Accepted Organizations:&nbsp;<b>{accepted}</b>
            </Typography>
          </Grid>
        </Grow>
        <Grid item xs={12}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="organizations"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="total" stroke="#82ca9d" />
          </LineChart>
        </Grid>
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
