import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Category from "@material-ui/icons/Category";
import Edit from "@material-ui/icons/Edit";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { BASE_URL } from "../../../../baseurl";
import Grid from "@material-ui/core/Grid";

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
    const [open, setOpen] = React.useState(false);
    const [notiOpen, setNotiOpen] = React.useState(false);
    const [notification, setNotification] = React.useState("");
    //
    //
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [name, setName] = React.useState(undefined);


    //create
    function EditSubCategory() {
        if (name === undefined || name.length === 0) {
            setNotiOpen(true);
            setNotification("Name Cannot be Empty");
        }
        else {
            console.log(props.id);
            axios
                .patch(`${BASE_URL}/superadmin/subcategory/${props.id}`, {
                    subcategoryName: name
                })
                .then(res => {
                    if (res.data.success === true) {
                        console.log(res.data);
                        setNotiOpen(true);
                        setNotification("Sub category Edited Successfully");
                        setOpen(false);
                    }
                })
                .catch(error => {
                    setNotiOpen(true);
                    setNotification("Error");
                    setOpen(false);
                    console.log(error.response);
                });
        }
    }


    //for dialog closing
    function handleClose(event, reason) {
        setOpen(false);
    }

    //for dialog
    const handleClickOpen = () => {
        setOpen(true);
    };


    //for name change
    const handleNameChange = event => {
        setName(event.target.value);
    };


    return (
        <div>
            <div className={classes.buttonGap}>
                <Button
                    onClick={handleClickOpen}
                >
                  <Edit />
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
                                style={{ textTransform: "none" }}
                                onClick={() => EditSubCategory()}
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                </DialogContent>
            </Dialog>
        </div>
    );
}
