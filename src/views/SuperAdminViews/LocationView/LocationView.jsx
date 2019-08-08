import React, { useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  withStyles,
  CircularProgress,
  IconButton
} from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// import Edit from "@mater/ial-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";

import axios from "axios";

import { BASE_URL } from "../../../baseurl.js"; //baseurl

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey"
      },
      "&:hover fieldset": {
        borderColor: "pink"
      },
      "&.Mui-focused fieldset": {
        borderColor: "pink"
      }
    }
  }
})(TextField);

export default function CreateCtiy(props) {
  const [city, setCity] = React.useState(undefined);
  const [cities, setCities] = React.useState([]);
  const handleCity = name => event => {
    setCity(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/superadmin/city`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setCities(res.data.data.cities);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  });

  function getCity() {
    axios
      .get(`${BASE_URL}/superadmin/city`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        if (res.data.success === true) {
          setCities(res.data.data.cities);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  function createCity() {
    if (city === undefined || city.length === 0) {
      setCity("");
    } else {
      axios
        .post(`${BASE_URL}/superadmin/city`, {
          cityName: city
        })
        .then(res => {
          if (res.data.success === true) {
            setCities([]);
            setCity(undefined);
            getCity();
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  // function editCity(id) {
  //   axios
  //     .patch(`${BASE_URL}/superadmin/city/${id}`, {
  //       headers: { Authorization: `bearer ` + props.token },
  //       cityName: editCity
  //     })
  //     .then(res => {
  //       if (res.data.success === true) {
  //         setCities(res.data.data.cities);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //     });
  // }

  function deleteCity(id) {
    axios
      .delete(`${BASE_URL}/superadmin/city/${id}`, {
        headers: { Authorization: `bearer ` + props.token }
      })
      .then(res => {
        setCities([]);
        // getCity();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <CssTextField
          id="outlined-city"
          label="City"
          value={city || ""}
          onChange={handleCity("city")}
          margin="normal"
          variant="outlined"
          fullWidth
          error={city === undefined ? false : city.length === 0 ? true : false}
          helperText={
            city === undefined
              ? false
              : city.length === 0
              ? "This cannot be empty"
              : false
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          color="secondary"
          variant="contained"
          style={{ width: "100%", textTransform: "none" }}
          onClick={() => createCity()}
        >
          Create
        </Button>
      </Grid>
      {cities.length !== 0 ? (
        <Grid item xs={12} style={{ marginTop: "5%" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                {/* <TableCell>Edit</TableCell> */}
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cities.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {/* <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => console.log("Edit" + row._id)}
                    >
                      <Edit />
                    </Button>
                  </TableCell> */}
                  <TableCell align="right">
                    <IconButton
                      color="secondary"
                      onClick={() => deleteCity(row._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      ) : (
        <Grid item xs={12} style={{ paddingLeft: "50%", paddingTop: "15%" }}>
          <CircularProgress color="secondary" />
        </Grid>
      )}
    </Grid>
  );
}
