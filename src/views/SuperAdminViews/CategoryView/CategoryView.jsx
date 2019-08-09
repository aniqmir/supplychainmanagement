import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import MaterialTable from "material-table";

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

  function getCategory() {
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
  }

  function createCategory(name) {
    axios
      .post(`${BASE_URL}/superadmin/category`, {
        categoryName: name
      })
      .then(res => {
        if (res.data.success === true) {
          // setCategory(undefined);
          getCategory();
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  function deleteCategory(id) {
    axios
      .delete(`${BASE_URL}/superadmin/category/${id}`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        getCategory();
        setCategories([]);
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  function createSubcategory(id, name) {
    axios
      .patch(`${BASE_URL}/superadmin/subcategory/${id}`, {
        subcategoryName: ` ${name}`
      })
      .then(res => {
        if (res.data.success === true) {
          getCategory();
          // setCategories([]);
          // setCategory(undefined);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
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
        console.log(error.response);
      });
  }

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

                  if (newData.name !== oldData.name) {
                    editCategory(newData._id, newData.name);
                  } else if (
                    newData.subCategories.length !==
                    oldData.subCategories.length
                  ) {
                    createSubcategory(newData._id, newData.subCategories);
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
        />
      </Grid>
    </Grid>
  );
}
