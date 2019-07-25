import React from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

export default function Admin(props){

    const loggedIn = localStorage.getItem('loggedIn'); //this state stays in Redux
    
    function logout(){
        localStorage.clear()
        window.location.reload()
    }

    if(!loggedIn){
        return <Redirect to='/'/>
    }
    else{
    return (
        <div>
            <Button onClick={()=>logout()}>Logout</Button>
        </div>
    )
    }
}