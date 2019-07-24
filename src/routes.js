import React from 'react';
import {
    Router,
    Route
    }   from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Sidebar from './components/Sidebar/Sidebar';


const customHistory = createBrowserHistory();



function CustomRoutes()   {
        return (
            <Router history={customHistory}>
            <div>
                <Route exact path='/' component={Sidebar}/>
            </div>
        </Router>
        )
    
 
}
    
export default CustomRoutes;