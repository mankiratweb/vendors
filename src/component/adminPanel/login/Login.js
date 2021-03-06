 
import React , { useState , useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';


function Login(){
    
    let history= useHistory();
    useEffect(()=> {
        if(localStorage.getItem('user-info'))
        {
           history.push('/'); 
        }
    
    },[]);
    let [email , setEmail]= useState("");
    let [password , setPassword] = useState("");
    let [errorlog , setErrorLog] = useState("");




async function loginForm(){

    console.log(email , password)
    

if(email===''){
    setErrorLog("Please Enter Your email")
}else{
    setErrorLog('')
}if(password==''){
setErrorLog("Please Enter Your Password")
}else{
    setErrorLog('')
}



let item = {email,password}

if(email!=''&& password!=''){
    let result = await fetch("http://127.0.0.1:8000/api/login ",{
    method : "POST",
    headers :{
"Content-Type" : "application/json",
"Accept": "application/json"
    },
    body: JSON.stringify(item)
});
result = await result.json();
console.warn("result",result.error[0]); 

 if(result.error[0]==="Incorrect Email")
{
    setErrorLog("Incorrect Email ");
}

if(result.error[0]==="Incorrect Password") 
{
    setErrorLog("Incorrect  Password");
}
 
if (result.error[0]==="login") {
    
  const  data={
id:result.data.id,
name:result.data.name,
email:result.data.email,
role:result.data.role,
    }

    localStorage.setItem("user-info",JSON.stringify(data));

// history.push("/");

}








    






}

}





    return(
        



        <div id="layoutAuthentication" class="bg-primary">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3>
                                    
                                    <span className="error">{errorlog}</span>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3"> 
                                                <input className="form-control" id="inputEmail" type="email" value={email} onChange={((e)=>setEmail(e.target.value))} placeholder="name@example.com" />
                                                <label for="inputEmail">Email address</label>
                                             
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputPassword" value={password} onChange={((e)=>setPassword(e.target.value))} type="password" placeholder="Password" />
                                                <label for="inputPassword">Password</label>
                                              
                                            </div>
                                           
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link className="small" to="forgot">Forgot Password?</Link>
                                                <button type="button" className="btn btn-primary"  onClick={ loginForm } >Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="register">Need an account? Sign up!</Link></div>
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




export default Login