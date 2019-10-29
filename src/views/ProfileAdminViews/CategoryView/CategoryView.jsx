import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import MaterialTable from "material-table";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import axios from "axios";

import { BASE_URL } from "../../../baseurl.js"; //baseurl

export default function CreateCategory(props) {
  const [categories, setCategories] = React.useState([]);
  const [state] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Subcategories", field: "subCategories" }
    ]
  });

  //useEffect
  useEffect(() => {
    axios
      .get(`${BASE_URL}/profileadmin/category`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setCategories(res.data.data.categories);
        }
      })
      .catch(error => {
        console.log("in catch of get categories");
        console.log(error.response);
      });
  }, [props]);

  
  if (categories.length > 0) {
    return ( 
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <MaterialTable
          title="Categories Table"
          columns={state.columns}
          // data={state.data}
          data={categories}
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
          detailPanel={rowData => {
            return (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subcategories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.subCategories.map(row => (
                    <TableRow key={row}>
                      <TableCell component="th" scope="row">
                        {row}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            );
          }}
        />
      </Grid>
    </Grid>
  );
 }
}
