import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Sub from './Sub';
import {
    CircularProgress
} from "@material-ui/core";
// import Suggestions from './ProfileInfo/Suggestions/Suggestions';

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
    progress: {
        paddingLeft: "50%",
        paddingTop: "25%"
    }
}));

//dialog for planner button
export default function ResponsiveDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    //
    //
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className={classes.buttonGap}>
                <Button
                    onClick={handleClickOpen}
                >
                    View SubCategories Here>>
                    </Button>
            </div>
            <Dialog
                maxWidth="md"
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <Grid
                        container
                        spacing={1}
                        style={{ marginTop: "2%" }}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                <b>Categories</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "10px" }}>
                            <p className="lead">
                                Select the category whose subcategories you wanna manage.
                            </p>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: "10px", marginTop: "-20px" }}>
                            <Divider style={{ height: "1px", backgroundColor: "black" }} />
                        </Grid>
                        {props.categories.length > 0 ? (
                            props.categories.map(cat => (
                                < Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <Sub category={cat} token={props.token} />
                                </Grid>
                            ))) : null}
                        <Grid
                            item
                            xs={12}
                            style={{ marginTop: "8%" }}
                        >
                            {/* <Suggestions token={props.tokn}/> */}
                        </Grid>

                    </Grid>
                </DialogContent>
            </Dialog>
        </div >
    );
}
