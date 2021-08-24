import React , {useEffect} from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import {Form , Button} from 'react-bootstrap';
import { useState  } from 'react';
 import {useHistory} from 'react-router-dom';
import { createSubCatAc , } from '../../../../Services/Actions/SubCatAction';
import {useDispatch,useSelector} from 'react-redux'
  

function SubCatAdd() {
    
    const [data , setData] = useState([]);
    const [error , setError] = useState("");
    
 

const history = useHistory();
const user = JSON.parse(localStorage.getItem('user-info'));
const [name , setName] = useState("");
const [status ,setStatus] = useState(1);
const [catId , setCatId] = useState("");

const dispatch = useDispatch();
const subCatSelector = useSelector(state => state.subCatRaducer)





useEffect( async() => {
     
 

  let result  = await fetch("http://127.0.0.1:8000/api/allcat");
  result = await result.json();
setData(result);

 }, [])



let [setNamee,setSetNamee]=useState(name)


 function subCatAdd(){
    
 
 
const formData = new FormData();

if(name=="" && !name){
setError("Please Enter Sub Category Name");
}
else{
    formData.append('name' ,name );
  setError('')
}


if(catId=='' || catId=="0"){
    setError("Please Select Category");

}else{
    formData.append('cat_id',catId);

}

if(status==0){
    formData.append('status',status);
}
else{ 
  formData.append('status',1);
}


formData.append('user_id',user.id);



if(catId!=='' && catId!=0 && user.id!='' && name!=='' && status!=''){

  dispatch(createSubCatAc(formData));


}

 
 }



 
useEffect(() => {
  if(subCatSelector.subError=='inserted'){
    history.push('/allsubcat')
  }else if(subCatSelector.subError=='already'){
    setError("Sub Category Already Exits Please Diffrent Sub Category Add")
  }else if(subCatSelector.subError=='error'){
    setError("Some error Please try Again Leater")
  }else{
    
  }
  console.warn("SubSelector",subCatSelector)
  console.warn("Error",subCatSelector.subError);
}, [subCatSelector])


useEffect(() => {
   if(catId!=''){
     setError('')
   }
   if(name!=''){
     setError('')

   }
}, [catId,name])


   return (
        <>

        <Header />
        
        <div id="layoutSidenav">
<Sidebar />


<div id="layoutSidenav_content">

                    <main>
                    {error!='' && error!='Please Enter Sub Category Name' &&  error!='Please Select Category'?<div className="alert alert-danger" role="alert">
  {error}
</div>:null}
                         <h1 className="mt-5" >Add Sub Category</h1>






                         <Form>




  <Form.Group className="mb-3 form-pro"   controlId="formBasicEmail">



  <Form.Select value={catId}  onChange={((e)=>setCatId(e.target.value))} >
<option value="0">Select Category</option>

{
data.map((item)=>

<option key={item.id} value={item.id}>{item.cat_name}</option>
)

}



</Form.Select>
 
{error=='Please Select Category'?<span className="text-danger">{error}</span> :null}




     
    <Form.Control type="text"    className="mt-5 p-3 ip"  onChange={((e)=>setName(e.target.value))} placeholder="Enter Sub Category Name" />
    {error=='Please Enter Sub Category Name'?<span className="text-danger">{error}</span> :null}
     <br />

         
       
   
    
     <Form.Select value={status}  className="ip" onChange={((e)=>setStatus(e.target.value))}>
  
    <option value = {1}>Active</option>
    <option value={0}>Deactive</option>
  </Form.Select>
 <br />
    
    <div className="d-grid gap-2">
  <Button variant="primary" onClick={subCatAdd} size="lg">
    Add Sub Category
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

export default SubCatAdd
