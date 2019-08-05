import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import Typography from "@material-ui/core/Typography";

import axios from "axios";

import { BASE_URL } from "../../../baseurl.js";
import { CircularProgress } from "@material-ui/core";

export default function MaterialTableDemo(props) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [errorText, setErrorText] = React.useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/superadmin/profile/filter/true`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        setData(res.data["data"]["profiles"]);
        setLoading(false);
        setErrorText("");
      })
      .catch(error => {
        setErrorText(error.response["data"]["Error"]["message"]);
        setLoading(false);
      });
  }, [props.token]);
  const [
    state
    // setState
  ] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Username", field: "username" },
      { title: "City", field: "city" },
      { title: "Email", field: "email", type: "string" },
      { title: "Phone", field: "phone", type: "string" },
      { title: "Salestax", field: "salestax", type: "numeric" }
    ]
    // data: [
    //   {
    //     name: "Mehmet",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zerya Betül",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 3500,
    //     percentage: "35%"
    //   },
    //   {
    //     name: "Rawal",
    //     surname: "Pindi",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zorawar",
    //     surname: "Shah",
    //     username: "MehmatB",
    //     salestax: 34500,
    //     percentage: "345%"
    //   },
    //   {
    //     name: "Mehmet",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zerya Betül",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 5500,
    //     percentage: "55%"
    //   },
    //   {
    //     name: "Rawal",
    //     surname: "Pindi",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zorawar",
    //     surname: "Shah",
    //     username: "MehmatB",
    //     salestax: 31500,
    //     percentage: "315%"
    //   },
    //   {
    //     name: "Mehmet",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zerya Betül",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 35000,
    //     percentage: "350%"
    //   },
    //   {
    //     name: "Rawal",
    //     surname: "Pindi",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zorawar",
    //     surname: "Shah",
    //     username: "MehmatB",
    //     salestax: 2500,
    //     percentage: "25%"
    //   },
    //   {
    //     name: "Mehmet",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zerya Betül",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 7500,
    //     percentage: "75%"
    //   },
    //   {
    //     name: "Rawal",
    //     surname: "Pindi",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zorawar",
    //     surname: "Shah",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Mehmet",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zerya Betül",
    //     surname: "Baran",
    //     username: "MehmatB",
    //     salestax: 6300,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Rawal",
    //     surname: "Pindi",
    //     username: "MehmatB",
    //     salestax: 63,
    //     percentage: "65%"
    //   },
    //   {
    //     name: "Zorawar",
    //     surname: "Shah",
    //     username: "MehmatB",
    //     salestax: 6500,
    //     percentage: "65%"
    //   }
    // ]
  });

  console.log(data);
  if (data.length > 0) {
    return (
      <Grid container>
        <Fade in={true} timeout={1500}>
          <Grid item xs={7} sm={10} md={12}>
            <MaterialTable
              title="SalesTax Table"
              columns={state.columns}
              // data={state.data}
              data={data}
              style={{
                padding: "10px",
                boxShadow: "0 .5rem 1rem rgba(0,0,0,0.15)"
              }}
              options={{
                headerStyle: {
                  backgroundColor: "silver",
                  color: "black",
                  cursor: "pointer"
                },
                rowStyle: {
                  backgroundColor: "#EEE",
                  textAlign: "left"
                },
                searchFieldStyle: {
                  border: "0.1px solid",
                  borderRadius: "3px",
                  padding: "7px",
                  boxShadow: "0 .5rem 1rem rgba(0,0,0,0.15)"
                },
                paginationType: "stepped"
              }}
              //   editable={{
              //     onRowAdd: newData =>
              //       new Promise(resolve => {
              //         setTimeout(() => {
              //           resolve();
              //           const data = [...state.data];
              //           data.push(newData);
              //           setState({ ...state, data });
              //         }, 600);
              //       }),
              //     onRowUpdate: (newData, oldData) =>
              //       new Promise(resolve => {
              //         setTimeout(() => {
              //           resolve();
              //           const data = [...state.data];
              //           data[data.indexOf(oldData)] = newData;
              //           setState({ ...state, data });
              //         }, 600);
              //       }),
              //     onRowDelete: oldData =>
              //       new Promise(resolve => {
              //         setTimeout(() => {
              //           resolve();
              //           const data = [...state.data];
              //           data.splice(data.indexOf(oldData), 1);
              //           setState({ ...state, data });
              //         }, 600);
              //       })
              //   }}
            />
          </Grid>
        </Fade>
      </Grid>
    );
  } else if (loading) {
    return (
      <div style={{ paddingLeft: "50%", paddingTop: "25%" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  } else {
    return (
      <Grow in={true} timeout={500}>
        <Typography variant="h5">{errorText}</Typography>
      </Grow>
    );
  }
}
