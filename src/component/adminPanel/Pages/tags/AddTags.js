import React , {useEffect} from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import {Form , Button} from 'react-bootstrap';
import { useState } from 'react';
 import {Link, useHistory} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { createTagAc } from '../../../../Services/Actions/TagAction';






function AddTags() {
    const dispatch = useDispatch();
    
const history = useHistory();
const user = JSON.parse(localStorage.getItem('user-info'));
const [status ,setStatus] = useState("");
const [error , setError] = useState("");
const [name , setName] = useState("");
const [catId , setCatId] = useState("");
const [data, setData]=useState([])
const tagAddSelect = useSelector(state => state.TagRaducer)


useEffect( async() => {
     
    let result  = await fetch("http://127.0.0.1:8000/api/allcat");
    result = await result.json();
  setData(result);
   

 }, [])



 
 



  function tagAdd(){
   
    
   const formData = new FormData();

    if(name==""){
        setError("Please Enter Tag Name");
        }
        else{
            formData.append('name' ,name );
            setError("");
        }
        
    
        if(status==0){
            formData.append('status',status);
        }
        else{
            formData.append('status',1);
        }
    
    
        if(catId=='0' || catId==''){
            setError("Please Select Category");
        }
        else{
            formData.append('cat_id',catId);
           
        }
    
    
    
        
    formData.append('user_id',user.id);
    console.warn("FormData",formData)

    if(catId!=='' && 1!='' && name!=='' && status==1 || status==0){


dispatch(createTagAc(formData));
        
    }

    
 
}

console.warn("Add Tag result",tagAddSelect.error)
useEffect( async() => {
    
    if(tagAddSelect.error.msg=='already'){
   setError("Tag is Alerady exits")
    }
    else if(tagAddSelect.error.msg=='update'){
history.push('/alltags');
    }
    else if(tagAddSelect.error=='Some_Error'){
        setError("Somer Error Try Again Leater and Contact Website Owner")
    }else{

    }
 
  }, [tagAddSelect,dispatch])









    return (
        <>
        <Header />
        
        <div id="layoutSidenav">
<Sidebar />





<div id="layoutSidenav_content">


{error?<div className="alert alert-danger" role="alert">
  {error}
</div>:null}
                    <main>



                    <ol className="breadcrumb m-4">
                                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                <li className="breadcrumb-item active"> <Link to="alltags"> Tags</Link> </li>

                                <li className="breadcrumb-item active"   > <Link to="addtags">Add</Link> </li>
                            </ol>










                             <Form className="mb-3 mt-5 form-pro">
  
  <Form.Select value={catId}  onChange={((e)=>setCatId(e.target.value))} >
<option value="0">Select Category</option>
{
data.map((item)=>

<option key={item.id} value={item.id}>{item.cat_name}</option>
)

}
</Form.Select>
<span className="error"> {error == "Please Select Category" ? error : null } </span>
 
    
    <Form.Control type="text"   value={name} className="mt-5 p-3 ip"  onChange={((e)=>setName(e.target.value))} placeholder="Enter Tag Name" />
    
    <span className="error"> {error== "Please Enter Tag Name" ? error : null } </span>
    <br />
<br />
         
       
   
    
     <Form.Select value={status}  className="ip" onChange={((e)=>setStatus(e.target.value))}>
    
    <option>Select Status</option>
    <option value = {1}>Active</option>
    <option value={0}>Deactive</option>
  </Form.Select>
  <span className="error"> { error=="Please Select Status" ? error : null } </span>
  <br /><br />
    
    <div className="d-grid gap-2">
  <Button variant="primary" onClick={tagAdd} size="lg">
    Publish
  </Button>
  
</div>

  
 
  
</Form>


              
                    </main>
                    
                </div>
 
</div>
</>

    )
}

export default AddTags
