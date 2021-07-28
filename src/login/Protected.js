import { useHistory } from "react-router";
import React , { useEffect } from 'react';

function Login(props){
    const history = useHistory();
    
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            history.push('/login');
        }  
    });
    let Cmp = props.Cmp 
    return(
        <>


        <Cmp />

        </>
    )
}



export default Login