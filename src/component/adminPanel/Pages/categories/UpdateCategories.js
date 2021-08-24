import Header from '../../common/Header';
import { withRouter , useHistory } from 'react-router';
import { Form , Button , Figure    } from 'react-bootstrap';
import Sidebar from '../../common/Sidebar'; 
import { useEffect, useState  } from 'react';



function UpdateCategories(props){



  const history = useHistory();
const[data , setData] = useState("");
 
const [name , setName] = useState("");
 
const [image , setImage] = useState("");
const [status , setStatus] = useState("");
const [statusCh , setStatusCh] = useState("");
const user = JSON.parse(localStorage.getItem('user-info'));






useEffect( async ()=>{
    let result = await fetch("http://127.0.0.1:8000/api/findcat/"+props.match.params.id);
    result  = await result.json();
    setData(result);
    // setStatusCh(result['status']);
 

    
},[])
 











 











async function update(id){
 
    console.warn(name,image , status  );


 const formData  = new FormData();

if(name==''){
  formData.append('name',data['cat_name']);
}else{
  formData.append('name',name);
}

if(image==''){
  formData.append('image',data['cat_file']);
  
}else{
  
  formData.append('image',image);
}


if(status=='0' || status=='1'){
  formData.append('status',status);
}else{
  formData.append('status',data['status']);
  
}

 
 
let result = await fetch("http://127.0.0.1:8000/api/updatecat/"+id+"/"+user.id+"/"+user.role+"?_method=PUT",{
 
  method:'POST',
 
  body: formData
});
result = await result.json();
console.warn(result)

if(result=="1"){
  alert("Updated")
  history.push("/allcat")
}
else{
  alert("You Can Update Only Your Categories")
}
  
 




}

























    return(
        <>
        <Header />
        
          <div id="layoutSidenav">
<Sidebar />

    <div id="layoutSidenav_content">
                    <main>
                         <h1>Update  Category</h1>





                         <Form>
  <Form.Group className="mb-3 form-pro"  controlId="formBasicEmail">
     
    <Form.Control type="text"  defaultValue={data.cat_name}   onChange={((e)=>setName(e.target.value))} placeholder="Product Name" /><br />
   
    
    <Figure>
  <Figure.Image
    width={171}
    height={180}
    alt="171x180"
    src={"http://127.0.0.1:8000/"+data.cat_file}
  />
  
</Figure>







    <Form.Control type="file" defaultValue={data.image}   onChange={((e)=>setImage(e.target.files[0]))} placeholder="Image" /><br />
    
   
   <Form.Select   onChange={((e)=>setStatus(e.target.value))}>
    
     
   {data.status==1?<option value="1" >Active</option>:<option value="0">Deactive</option>} 
   {data.status==1?<option value="0" >Deactive</option>:<option value="1">Active</option>} 
    
  </Form.Select><br />
    
    <div className="d-grid gap-2">
  <Button variant="primary" onClick={(()=>update(data.id))} size="lg">
    Publish
  </Button>
  
</div>

  </Form.Group>

 
  
</Form>















                       
                    </main>
                    
                </div>
 

</div>



        </>

    )
}


export default withRouter(UpdateCategories);