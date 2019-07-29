import React from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import Grow from "@material-ui/core/Grow";

export default function MaterialTableDemo() {
  const [
    state
    // setState
  ] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Surname", field: "surname" },
      { title: "Username", field: "username" },
      { title: "Salestax", field: "salestax", type: "numeric" }
      //   {
      //     title: "Birth Place",
      //     field: "birthCity",
      //     lookup: { 34: "İstanbul", 63: "Şanlıurfa", 75: "Rawalpindi" }
      //   }
    ],
    data: [
      { name: "Mehmet", surname: "Baran", username: "MehmatB", salestax: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Rawal", surname: "Pindi", username: "MehmatB", salestax: 63 },
      {
        name: "Zorawar",
        surname: "Shah",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Mehmet", surname: "Baran", username: "MehmatB", salestax: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Rawal", surname: "Pindi", username: "MehmatB", salestax: 63 },
      {
        name: "Zorawar",
        surname: "Shah",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Mehmet", surname: "Baran", username: "MehmatB", salestax: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Rawal", surname: "Pindi", username: "MehmatB", salestax: 63 },
      {
        name: "Zorawar",
        surname: "Shah",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Mehmet", surname: "Baran", username: "MehmatB", salestax: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Rawal", surname: "Pindi", username: "MehmatB", salestax: 63 },
      {
        name: "Zorawar",
        surname: "Shah",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Mehmet", surname: "Baran", username: "MehmatB", salestax: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Rawal", surname: "Pindi", username: "MehmatB", salestax: 63 },
      {
        name: "Zorawar",
        surname: "Shah",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Mehmet", surname: "Baran", username: "MehmatB", salestax: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        username: "MehmatB",
        salestax: 63
      },
      { name: "Rawal", surname: "Pindi", username: "MehmatB", salestax: 63 },
      {
        name: "Zorawar",
        surname: "Shah",
        username: "MehmatB",
        salestax: 63
      }
    ]
  });

  return (
    <Grid container>
      <Grow in={true} timeout={1500}>
        <Grid item xs={7} sm={10} md={12}>
          <MaterialTable
            title="SalesTax Table"
            columns={state.columns}
            data={state.data}
            style={{
              padding: "10px",
              boxShadow: "0 .5rem 1rem rgba(0,0,0,0.15)"
            }}
            options={{
              headerStyle: {
                backgroundColor: "black",
                color: "pink"
              },
              rowStyle: {
                backgroundColor: "#EEE"
              },
              searchFieldStyle: {
                border: "0.5px solid",
                padding: "7px"
              }
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
      </Grow>
    </Grid>
  );
}
