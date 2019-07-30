import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "../../../components/Card/Card.jsx";
import Grow from "@material-ui/core/Grow";

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
