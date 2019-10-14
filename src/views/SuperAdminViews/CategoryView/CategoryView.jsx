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

import Notification from "../../../components/Notification/Notification.jsx";

export default function CreateCategory(props) {
  const [categories, setCategories] = React.useState([]);
  const [state] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Subcategories", field: "subCategories" }
    ]
  });

  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/superadmin/category`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setCategories(res.data.data.categories);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }, [props]);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  function getCategory() {
    axios
      .get(`${BASE_URL}/superadmin/category`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          console.log(res.data.data.categories);
          setCategories(res.data.data.categories);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  function createCategory(name) {
    if (name) {
      axios
        .post(`${BASE_URL}/superadmin/category`, {
          categoryName: name
        })
        .then(res => {
          if (res.data.success === true) {
            // setCategory(undefined);
            getCategory();
            setOpen(true);
            setNotification("Category Added!");
          }
        })
        .catch(error => {
          setOpen(true);
          setNotification(error.response);
          console.log(error.response);
        });
    }

  }

  function deleteCategory(id) {
    axios
      .delete(`${BASE_URL}/superadmin/category/${id}`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        getCategory();
        setCategories([]);
        setOpen(true);
        setNotification("Category Deleted!");
      })
      .catch(error => {
        setOpen(true);
        setNotification(error.response);
        console.log(error.response);
      });
  }

  function createSubcategory(id, name) {
    if (name !== "nill") {
      axios
        .patch(`${BASE_URL}/superadmin/subcategory/${id}`, {
          subcategoryName: name
        })
        .then(res => {
          if (res.data.success === true) {
            // console.log(res.data);
            getCategory();
            // setCategories([]);
            // setCategory(undefined);
            setOpen(true);
            setNotification("Subcategory Added Succesfully!");
          }
        })
        .catch(error => {
          setOpen(true);
          setNotification(error.response);
          console.log(error.response);
        });
    }
  }

  function editCategory(id, name) {
    axios
      .patch(`${BASE_URL}/superadmin/category/${id}`, {
        categoryName: name
      })
      .then(res => {
        if (res.data.success === true) {
          getCategory();
          // setCategories([]);
          // setCategory(undefined)
        }
      })
      .catch(error => {
        setOpen(true);
        setNotification(error.response);
        console.log(error.response);
      });
  }

  // console.log(categories);

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
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  createCategory(newData.name);
                });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  editCategory(newData._id, newData.name);
                  if ((typeof newData.subCategories) === "string") {
                    var array = newData.subCategories.split(",");
                    if (JSON.stringify(array) !== JSON.stringify(oldData.subCategories)) {
                      console.log("not equal");
                      createSubcategory(newData._id, array);
                    }
                  }
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  deleteCategory(oldData._id);
                }, 600);
              })
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
      {open ? (
        <Notification
          open={open}
          handleClose={handleClose}
          notification={notification}
        />
      ) : (
          <div />
        )}
    </Grid>
  );
}
