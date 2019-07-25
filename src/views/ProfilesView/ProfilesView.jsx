import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const data = [
    {
        name:'name1',
        surname:'surname1',
        username:'username1',
        email:'email1',
        location:'location1',
        city:'city1',
        designation:'designation1',
        phone:'phone1',
        displaypicture:'https://uifaces.co/images/man.svg'
    },
    {
        name:'name2',
        surname:'surname2',
        username:'username2',
        email:'email2',
        location:'location2',
        city:'city2',
        designation:'designation2',
        phone:'phone2',
        displaypicture:'https://uifaces.co/images/man.svg'
    },
    {
        name:'name1',
        surname:'surname1',
        username:'username1',
        email:'email1',
        location:'location1',
        city:'city1',
        designation:'designation1',
        phone:'phone1',
        displaypicture:'https://uifaces.co/images/man.svg'
    },
    {
        name:'name2',
        surname:'surname2',
        username:'username2',
        email:'email2',
        location:'location2',
        city:'city2',
        designation:'designation2',
        phone:'phone2',
        displaypicture:'https://uifaces.co/images/man.svg'
    }
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Profiles() {
  const classes = useStyles();

return(
        <List className={classes.root}>
        <Grid container spacing={1}>
        {
            data.map((type,key)=>{
            return(
            <Grid item xs={12}>
              <ListItem alignItems="flex-start" key={key} button onClick={()=>console.log(type)}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={type.displaypicture} />
              </ListItemAvatar>
              <ListItemText
                primary={type.surname}
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {type.email}
                    </Typography>
                    {" — "+type.name+" — "+type.city+" — "+type.designation}
                    <Divider/>
                    </React.Fragment>
                }
                />
              </ListItem>
              </Grid>
            )
        })
    }
    </Grid>
    </List>
       
)  
}