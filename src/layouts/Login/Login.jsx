import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button,TextField,Grid, Typography } from '@material-ui/core';
import { withStyles,makeStyles } from '@material-ui/core/styles';


const backgroundStyle={
    backgroundImage:'url(https://i.pinimg.com/originals/e0/d6/6a/e0d66a03fdf7fecce02b8b76e141d325.jpg)',
    width:'100%',
    height:'100vh',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    backgroundColor:'rgba(0,0,0,0.8)',
    backgroundBlendMode: 'overlay'
}

const gridStyle={
    minWidth:275,
    textAlign:'center',
    position:'absolute',
    maxWidth:300,
}


const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextField);

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    input:{
        color:'white'
    },
    button:{
        color:'white',
        textTransform:'none',
        borderColor:'white'
    }
  }));

export default function Login(props){

    const classes = useStyles();

    const [values, setValues] = React.useState({
        email:'',
        password:''
      });
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };

    const loggedIn = localStorage.getItem('loggedIn');

    function loggedInfunc(){
        if(values.email==='superadmin'){
            localStorage.clear()
            localStorage.setItem('type','Superadmin');
            localStorage.setItem('loggedIn',true);
            props.history.push('/dashboard')
            window.location.reload()
        }
        else if(values.email==='admin'){
            localStorage.clear()
            localStorage.setItem('type','admin');
            localStorage.setItem('loggedIn',true);
            props.history.push('/dashboard')
            window.location.reload()
        }
        else{
            localStorage.clear()
            localStorage.setItem('type','Superadmin');
            localStorage.setItem('loggedIn',true);
            props.history.push('/dashboard')
            window.location.reload()
        }
    }

    if(!loggedIn){
        return (
            <Grid container justify='center' alignItems='center' style={backgroundStyle}>
            <Grid item xs={12} container spacing={1} style={gridStyle}>
                <Grid item xs={12}>
                  <Typography color='default'>Supply Chain Management</Typography>
                </Grid>
                <Grid item xs={12}>
                <CssTextField
                    className={classes.margin}
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange('email')}
                    fullWidth
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        className: classes.input,
                    }}
                />
                </Grid>
                <Grid item xs={12}>
                <CssTextField
                    className={classes.margin}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange('password')}
                    fullWidth
                    InputProps={{
                        className: classes.input,
                    }}
                    InputLabelProps={{
                        className: classes.input,
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                    <Button 
                    className={classes.button}
                    variant='outlined'
                    size='large'
                    onClick={()=>loggedInfunc()}>
                        Login
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                    className={classes.button}
                    variant='outlined'
                    size='large'
                    onClick={()=>loggedInfunc()}>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
            </Grid>
        )
    }
    else{
        return (<Redirect to='/dashboard'/>)
    }
}