import React, { useEffect } from "react";
import Button from '@material-ui/core/Button'; import {
    CircularProgress
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Category from "@material-ui/icons/Category";
import Delete from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { BASE_URL } from "../../../../baseurl";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Notification from "../../../../components/Notification/Notification";
import Edit from "./Edit";
// import Suggestions from './ProfileInfo/Suggestions/Suggestions';


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



const useStyles = makeStyles(theme => ({
    buttonGap: {
        marginLeft: "0px",
        [theme.breakpoints.up("sm")]: {
            marginLeft: "23px"
        }
    },
    rightGap: {
        marginLeft: "25px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0px"
        }
    },
    btn: {
        marginLeft: "0px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "15%",
            marginRight: "15%"
        }
    },
    div: {
        border: "1px solid #bbb",
        borderRadius: "5px",
        margin: "1%",
        fontSize: "14px",
        backgroundColor: "#ccc",
        paddingTop: "5px",
        marginLeft: "5px",
        width: "auto",
        height: "60px",
        [theme.breakpoints.down("sm")]: {
            width: "350px",
            height: "60px",
            fontSize: "11px",
            marginLeft: "2px"
        }
    },
    icons: {
        marginLeft: "40px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "20px"
        }
    }
}));



//dialog for planner button
export default function ResponsiveDialog(props) {
    const classes = useStyles();
    const [subCategories, setSubCategories] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [notiOpen, setNotiOpen] = React.useState(false);
    const [notification, setNotification] = React.useState("");
    //
    //
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [name, setName] = React.useState(undefined);
    //
    //
    //
    //useEffect for getting categories from props and put in state
    useEffect(() => {
        getSubCategories();
    },
        [props]);

    //getSubCategories
    function getSubCategories() {
        console.log(props.category._id)
        axios
            .get(`${BASE_URL}/superadmin/category/${props.category._id}`, {
                headers: { Authorization: `bearer ` + props.token }
            })
            .then(res => {
                if (res.data.success === true) {
                    console.log(res.data);
                    setSubCategories(res.data.data.categories[0].subCategories);
                }
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    //create
    function createSubCategory() {
        console.log(props.category._id);
        if (name === undefined || name.length === 0) {
            setNotiOpen(true);
            setNotification("Name Cannot be Empty");
        }
        else {
            console.log(props.category._id);
            axios
                .post(`${BASE_URL}/superadmin/subcategory/${props.category._id}`, {
                    subcategoryName: name
                })
                .then(res => {
                    if (res.data.success === true) {
                        console.log(res.data);
                        getSubCategories();
                        setNotiOpen(true);
                        setNotification("Subcategory Added Succesfully!");
                        setName(undefined);
                    }
                })
                .catch(error => {
                    setNotiOpen(true);
                    setNotification(error.response);
                    console.log(error.response);
                });
        }
    }

    //deleteee
    function deleteSubCategory(id) {
        console.log(id);
        axios
            .delete(`${BASE_URL}/superadmin/subcategory/${id}`, {
                headers: { Authorization: `bearer ` + props.token }
            })
            .then(res => {
                getSubCategories();
                setNotiOpen(true);
                setNotification("Subcategory Deleted Succesfully!");

            })
            .catch(error => {
                setNotiOpen(true);
                setNotification(error.response);
                console.log(error.response);
            });
    }

    //for dialog closing
    function handleClose(event, reason) {
        setOpen(false);
    }

    //for dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

        //for dialog opening 
    const handleOpen = () => {
        setOpen(true);
    };
    

    //for name change
    const handleNameChange = event => {
        setName(event.target.value);
    };

    //for noti closing    
    function handleNotiClose(event, reason) {
        setNotiOpen(false);
    }



    return (
        <div>
            <div className={classes.buttonGap}>
                <Button
                    onClick={handleClickOpen}
                    className={classes.btn}
                    style={{ backgroundColor: "#ccc", width: "220px" }}
                >
                    <Category style={{ marginRight: "5px" }}>
                    </Category>
                    <b
                        style={{ width: "220px" }}
                    > {props.category.name} </b>
                </Button>
            </div>
            <Dialog
                maxWidth="lg"
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent >

                    <Grid
                        container
                        spacing={1}
                        style={{ marginTop: "2%" }}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                <b>Sub Categories</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "10px" }}>
                            <p className="lead">
                                Here you can edit, delete and create subcategories as required.
                            </p>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: "10px", marginTop: "-20px" }}>
                            <Divider style={{ height: "1px", backgroundColor: "black" }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <CssTextField
                                id="outlined-name"
                                label="Name"
                                value={name || ""}
                                onChange={e => handleNameChange(e)}
                                // InputProps={{
                                //    onChange: handleProfileChange("name")
                                // }}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                required={true}
                                error={
                                    name === undefined
                                        ? false
                                        : name.length === 0
                                            ? true
                                            : false
                                }
                                helperText={
                                    name === undefined
                                        ? false
                                        : name.length === 0
                                            ? "This cannot be empty"
                                            : false
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                style={{ textTransform: "none",  marginTop: "20px" }}
                                onClick={() => createSubCategory()}
                            >
                                Create
                            </Button>
                        </Grid>
                        {subCategories.length > 0 ? (
                            subCategories.map(sub => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <div className={classes.div}>
                                        {/* /category icon */}
                                        <Category />
                                        <b>{sub.name}</b>
                                        <span className={classes.icons}>
                                            
                                            {/* //delete icon */}
                                            <Button onClick={() => deleteSubCategory(sub._id)}>
                                                <Delete />
                                            </Button>
                                            {/* //dialog */}
                                            {/* <Edit id={sub._id} token={props.token} update={handleOpen}/> */}
                                            
                                        </span>
                                    </div>
                                </Grid>
                            ))) : (null)}
                            <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                justifyContent="flex-end"
                                alignContent="flex-end"
                                alignItems="flex-end"
                                 onClick={handleClose}
                              >
                            Close
                            </Button>
                            </Grid> 
                        <Notification
                            open={notiOpen}
                            handleClose={handleNotiClose}
                            notification={notification}
                        />
                    </Grid>
                    <br />
                    <br />
                </DialogContent>
            </Dialog>
        </div>
    );
}
