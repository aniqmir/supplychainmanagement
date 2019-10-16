import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
 import Profile from './Profile/Profile';
 import Suggestions from './Suggestions/Suggestions';

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
    }
}));

//dialog for planner button
export default function ResponsiveDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

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
                    PROFILE
                    </Button>
            </div>
            <Dialog
                maxWidth="md"
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent >
                    <Grid 
                    container 
                    spacing={1}
                    >
                        {/* //First Grid for Left Section */}
                        <Grid
                            item
                            xs={12}
                        >
                            <Profile  token={props.tokn}/>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Suggestions token={props.tokn}/>
                        </Grid>

                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}
