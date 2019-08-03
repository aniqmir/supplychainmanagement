import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "../../../components/Card/Card.jsx";
import Grow from "@material-ui/core/Grow";

import Clock from "react-live-clock";

const data1 = [
  {
    image:
      "http://www.capitalmarket.com/IImages/technical-financial-graph-on-technology-abstract-background_stock-exchange.jpeg",
    title: "Graph1",
    description: "Lorem Ipsum"
  },
  {
    image:
      "http://www.capitalmarket.com/IImages/technical-financial-graph-on-technology-abstract-background_stock-exchange.jpeg",
    title: "Graph2",
    description: "Lorem Ipsum"
  },
  {
    image:
      "http://www.capitalmarket.com/IImages/technical-financial-graph-on-technology-abstract-background_stock-exchange.jpeg",
    title: "Graph3",
    description: "Lorem Ipsum"
  }
];
export default function Dashboard() {
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
      {data1.map((type, key) => {
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
      })}
    </Grid>
  );
}
