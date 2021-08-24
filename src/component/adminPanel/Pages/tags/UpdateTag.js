import React , {useEffect} from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import {Form , Button} from 'react-bootstrap';
import { useState } from 'react';
 import {useHistory, withRouter} from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import axios from "axios";
import { findSingleTag, updatedTag } from '../../../../Services/Actions/TagAction';




 
 function UpdateTag(props) {
     
let dispatch= useDispatch(); 
  useEffect( () => {
    dispatch(findSingleTag(props.match.params.id , JSON.parse(localStorage.getItem('user-info')).id))

   
},[]);


   const history = useHistory();
   const user = JSON.parse(localStorage.getItem('user-info'));
   const [status ,setStatus] = useState("");
   const [error , setError] = useState("");
   const [name , setName] = useState("");
 
   const [catId , setCatId] = useState("");
   const [data, setData]=useState("")
   const [catData, setCatData]=useState([]);
   
   let id = props.match.params.id;
   const TagState = useSelector(state => state.TagRaducer.tagsData[0]);

   let updateState = useSelector(state => state.TagRaducer.error);
    
 

 

 

 useEffect( async() => {
     
    let result  = await fetch("http://127.0.0.1:8000/api/allcat");
    result = await result.json();
  setCatData(result);
   

 }, []);
//  console.warn("Check Finf",TagState)

async  function tagupdate(){
 
 const formData = new FormData();
    if(name==''){
        formData.append('name' ,TagState.name);
         
        }
        else{
            formData.append('name' ,name );
             
        }
        
    
        if(status==''){
            formData.append('status',TagState.status);
           
        }
        else{
            formData.append('status',status);
        }
    
    
        if(catId=='0' || catId==''){
            formData.append('cat_id',TagState.cat_id);
        }
        else{
            formData.append('cat_id',catId);
           
        }
      
   
  dispatch(updatedTag(formData,id,user.id));
 
 
  


}


useEffect(() => {
   
  if(updateState==='Not_Updated'){
    setError("You Can't Update Only Admin can Updated")
      }
   else if(updateState===1){
    setError("Updated")
         history.push('/alltags');
      }
       
   else{
  
      }
      
}, [updateState])

 
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
                         <h1 className="mt-5" >Tag Update</h1>
      
                         <Form className="mb-3 mt-5 form-pro">
  
  <Form.Select value={catId}  onChange={((e)=>setCatId(e.target.value))} >
 





{
catData.map((item , key)=>
 
  TagState?
  TagState.id==id?
TagState.cat_name==item.cat_name? <option  key={key}  value={item.id}>{item.cat_name}</option> : null: null:null
  )
 
}
{
catData.map((item , key)=>
 
 TagState? TagState.id==id?
TagState.cat_name!=item.cat_name? <option key={key}  value={item.id}>{item.cat_name}</option>: null: null:null
  )



}
 
 


</Form.Select>
<span className="error"> {error == "Please Select Category" ? error : null } </span>
   {
     
 TagState?
 TagState.id==id?
    <Form.Control defaultValue={TagState.name} type="text" className="mt-5 p-3 ip"  onChange={((e)=>setName(e.target.value))} placeholder="Enter Tag Name" />:
  
  
  null:null  }

    
    <br />
<br />
         
       
   
    
     <Form.Select   className="ip" onChange={((e)=>setStatus(e.target.value))}>
    
    
     { 

     TagState?
     TagState.id==id?
     TagState.status==1 ?<>
     < option value = "1">Active</option>
     <option value = "0">Deactive</option>
     </>:<>  <option value = "0">Deactive</option>
     < option value = "1">Active</option></>:null
     :null
     
     }
     
  
  
  
      
  </Form.Select>
  <span className="error"> { error=="Please Select Status" ? error : null } </span>
  <br /><br />
    
    <div className="d-grid gap-2">
  <Button variant="primary" onClick={tagupdate} size="lg">
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

export default withRouter(UpdateTag);
