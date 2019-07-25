import React from 'react';
import {
    Router,
    Route,
    Redirect
    }   from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './layouts/Login/Login.jsx';
import SuperAdmin from './layouts/SuperAdmin/SuperAdmin.jsx';

import Admin from './layouts/Admin/Admin.jsx';

const customHistory = createBrowserHistory();

const type = localStorage.getItem('type'); //update when user logs in;


function CustomRoutes(){

    function routestoRender(){
        if(type==='Superadmin'){
            return(
                <div>
                    <Route exact path='/dashboard' component={SuperAdmin}/>
                    <Route exact path='/profiles' component={SuperAdmin}/>
                    <Route exact path='/request' component={SuperAdmin}/>
                    <Route exact path='/salestax' component={SuperAdmin}/>
                </div>
            )
        }
        else if(type==='admin'){
            return(
                <div>
                    <Route exact path='/dashboard' component={Admin}/>
                </div>
            )
        }
        else{
           return  <Redirect to='/'/>
        }
    }

    return(
        <Router history={customHistory}>
            <Route exact path='/' component={Login}/>
            {routestoRender()}
        </Router>
    )
}
    
export default CustomRoutes;