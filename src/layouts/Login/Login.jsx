import React from "react";
import { Redirect } from "react-router-dom";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import axios from "axios";

const backgroundStyle = {
  backgroundImage:
    "url(https://i.pinimg.com/originals/e0/d6/6a/e0d66a03fdf7fecce02b8b76e141d325.jpg)",
  width: "100%",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "rgba(0,0,0,0.8)",
  backgroundBlendMode: "overlay"
};

const gridStyle = {
  minWidth: 275,
  textAlign: "center",
  position: "absolute",
  maxWidth: 300
};

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  input: {
    color: "white"
  },
  button: {
    color: "white",
    textTransform: "none",
    borderColor: "white"
  }
}));

export default function Login(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const loggedIn = localStorage.getItem("loggedIn");

  function loggedInfunc(e) {
    e.preventDefault();
    console.log("called");
    axios
      .post(`https://supplychaininventory-api.herokuapp.com/api/auth`, {
        email: values.email,
        password: values.password
      })
      .then(res => {
        if (res.data.success === true && res.data.type === undefined) {
          localStorage.setItem("type", "Superadmin");
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("token", res["data"]["data"].token);
          props.history.push("/dashboard");
          window.location.reload();
        } else {
          localStorage.setItem("type", "admin");
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("token", res.data.token);
          props.history.push("/dashboard");
          window.location.reload();
        }
      })
      .catch(error => alert(error.response));
    // if (values.email === "superadmin") {
    //   localStorage.clear();
    //   localStorage.setItem("type", "Superadmin");
    //   localStorage.setItem("loggedIn", true);
    //   props.history.push("/dashboard");
    //   window.location.reload();
    // } else if (values.email === "admin") {
    //   localStorage.clear();
    //   localStorage.setItem("type", "admin");
    //   localStorage.setItem("loggedIn", true);
    //   props.history.push("/dashboard");
    //   window.location.reload();
    // } else {
    //   localStorage.clear();
    //   localStorage.setItem("type", "Superadmin");
    //   localStorage.setItem("loggedIn", true);
    //   props.history.push("/dashboard");
    //   window.location.reload();
    // }
  }

  if (!loggedIn) {
    return (
      <form onSubmit={e => loggedInfunc(e)}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={backgroundStyle}
        >
          <Grid item xs={12} container spacing={1} style={gridStyle}>
            <Fade in={true} timeout={1000}>
              <Grid item xs={12}>
                <Typography>Supply Chain Management</Typography>
              </Grid>
            </Fade>
            <Fade in={true} timeout={2000}>
              <Grid item xs={12}>
                <CssTextField
                  className={classes.margin}
                  id="outlined-email-input"
                  label="Email"
                  // type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange("email")}
                  fullWidth
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.input
                  }}
                />
              </Grid>
            </Fade>
            <Fade in={true} timeout={3000}>
              <Grid item xs={12}>
                <CssTextField
                  className={classes.margin}
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange("password")}
                  fullWidth
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.input
                  }}
                />
              </Grid>
            </Fade>
            <Fade in={true} timeout={4000}>
              <Grid item xs={6}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  size="large"
                  type="submit"
                  // onClick={() => loggedInfunc()}
                >
                  Login
                </Button>
              </Grid>
            </Fade>
            <Fade in={true} timeout={5000}>
              <Grid item xs={6}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  size="large"
                  // onClick={() => loggedInfunc()}
                >
                  Sign Up
                </Button>
              </Grid>
            </Fade>
          </Grid>
        </Grid>
      </form>
    );
  } else {
    return <Redirect to="/dashboard" />;
  }
}
