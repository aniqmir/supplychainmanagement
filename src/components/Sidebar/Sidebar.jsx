import React,{useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  logout: {
    flexGrow:1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // borderBottom:'1px solid black',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  background:{
    // backgroundImage:`url(${'https://img1.tongtool.com/u/7579gb8g5978f47f58eacc8af7c8a7ab9b76qwnL.jpg'})`,
    backgroundBlendMode: 'overlay',
    backgroundColor:'rgba(0,0,0,0.9)',
    color:'white'
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    // borderBottom:'1px solid white',
    ...theme.mixins.toolbar,
  },
  content: {
    // backgroundImage:'url(https://img1.tongtool.com/u/7579gb8g5978f47f58eacc8af7c8a7ab9b76qwnL.jpg)',
    backgroundSize:'cover',
    backgroundColor:'rgba(0,0,0,0.1)',
    backgroundBlendMode:'overlay',
    height:'100vh',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  selected: {
    backgroundColor:'black !important',
    color:'pink'
  },
  listitemicon:{
    color:'white'
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  
  useEffect(()=>{
    props.listitemnames.map((route,key)=>{
      if(route===props.path.slice('/')){
          setSelectedIndex(key)
      }
      return null
    })
  })

  function handleListItemClick(event, index,text) {
    setSelectedIndex(index);
    props.history.push('/'+ text)
  }


  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function logout(){
    localStorage.clear()
    window.location.reload()
}
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color='default'
          position="fixed"
          elevation={0}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {props.path.charAt(0).toUpperCase()+props.path.slice(1)}
            </Typography>
              <div className={classes.logout}/>
            <Button onClick={()=>logout()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          elevation={0}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.background,{
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <Typography variant='caption'>{props.heading}</Typography>
            <IconButton onClick={handleDrawerClose}
            classes={{
              root:classes.listitemicon
            }}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {props.listitemnames.map((text, index) => (
              <ListItem
              alignItems='center' 
              button key={text}  
              selected={selectedIndex === index}
              onClick={event => handleListItemClick(event,index,text)}
              classes={{
                selected:classes.selected
              }}
              >
                <ListItemIcon  
                classes={{
                  root:classes.listitemicon
                }} >
                {props.icon[index]}
                </ListItemIcon>
                <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            {props.view}
        </main>
      </div>
    );
}
