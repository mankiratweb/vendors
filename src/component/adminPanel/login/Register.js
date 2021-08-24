import React , { useState , useEffect } from 'react';
 
import {useHistory} from 'react-router-dom';
 




function Register(){
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPass]= useState("");
    const [cpass,setCpass]= useState("");
    let history= useHistory();









useEffect(()=> {
    if(localStorage.getItem('user-info'))
    {
       history.push('/'); 
    }

}, );















async function signUp(){
 
if(password===cpass){

    let item = {name,email,password};
    console.warn(item);
    
    let result = await fetch("http://127.0.0.1:8000/api/register",{
    method: 'POST',
    headers:{
        "Content-Type":"application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(item)
    
    }) ;
    result = await result.json();
 
    console.warn("result",result); 
    
    history.push('/login');
    













}

}




return(


<div id="layoutAuthentication" class="bg-primary">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="Name" type="text"  value={name} onChange={((e)=>setName(e.target.value))}placeholder="Enter your   name" />
                                                        <label for="inputFirstName">First name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="form-floating mb-3 ">
                                                <input className="form-control" id="inputEmail" type="email" value={email} onChange={((e)=>setEmail(e.target.value))} placeholder="name@example.com" />
                                                <label for="inputEmail">Email address</label>
                                            </div>
                                                </div>
                                                
                                            </div>
                                            
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPassword" value={password} onChange={((e)=>setPass(e.target.value))} type="password" placeholder="Create a password" />
                                                        <label for="inputPassword">Password</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPasswordConfirm" type="password"  value={cpass} onChange={((e)=>setCpass(e.target.value))} placeholder="Confirm password" />
                                                        <label for="inputPasswordConfirm">Confirm Password</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 mb-0">
                                                <div className="d-grid"><button  type="button" class="btn btn-primary btn-block" onClick={ signUp }>Create Account</button></div>
                                            </div>
                                        </form>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
          
        </div>



















    
)

}



export default Register