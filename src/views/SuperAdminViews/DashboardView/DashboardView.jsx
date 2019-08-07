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
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
  // Scatter
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

  const data = [
    {
      name: "Organizations",
      uv: 590,
      pv: 800,
      amt: 1400,
      cnt: 490
    }
    // {
    //   name: "Page B",
    //   uv: 868,
    //   pv: 967,
    //   amt: 1506,
    //   cnt: 590
    // },
    // {
    //   name: "Page C",
    //   uv: 1397,
    //   pv: 1098,
    //   amt: 989,
    //   cnt: 350
    // },
    // {
    //   name: "Page D",
    //   uv: 1480,
    //   pv: 1200,
    //   amt: 1228,
    //   cnt: 480
    // },
    // {
    //   name: "Page E",
    //   uv: 1520,
    //   pv: 1108,
    //   amt: 1100,
    //   cnt: 460
    // },
    // {
    //   name: "Page F",
    //   uv: 1400,
    //   pv: 680,
    //   amt: 1700,
    //   cnt: 380
    // }
  ];

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
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="amt"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            {/* <Scatter dataKey="cnt" fill="red" /> */}
          </ComposedChart>
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
