import React,{useState , useEffect} from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import {Form , Button} from 'react-bootstrap';
import { useHistory, withRouter } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { getSingleSubCat, updateSubCatAc } from '../../../../Services/Actions/SubCatAction';

function UpdateSubCat(props) {
  let history = useHistory();
let [name, setName] = useState("");
const user = JSON.parse(localStorage.getItem('user-info'));
let [catId, setCatId] = useState("");
let [error , setError] = useState("");
let [data , setData] = useState("");
let [catData , setCatData] = useState([]);
let [status , setStatus ] = useState("");
const id = props.match.params.id;
const dispatch = useDispatch();
const subCatSelect = useSelector(state => state.subCatRaducer);
const [subCatData,setSubCatData] =useState([]);


useEffect(() => {
 dispatch(getSingleSubCat(props.match.params.id));
   getCatData()
}, [])
 



 

async function getCatData(){

  let result = await fetch("http://127.0.0.1:8000/api/allsubcat");
  result = await result.json();
  console.log(result);
  setCatData(result.result)

}




 

















console.warn("Categories",catData);




function subCatUpdate(){
 

  const formData = new FormData();
 if(name==''){


  formData.append('name',subCatSelect.subCatData[0].name)

 }else{
   formData.append('name',name);
 }
 if(catId==''){


  formData.append('cat_id',subCatSelect.subCatData[0].cat_id)

 }else{
   formData.append('cat_id',catId);
 }

 if(status=='1' || status=='0'){


  formData.append('status',status)

 }else{
   formData.append('status',subCatSelect.subCatData[0].status);
 }


dispatch(updateSubCatAc(id,user.id,user.role , formData));
 

    
}




useEffect(() => {
   if(subCatSelect.subError=='updated'){
     alert("Updated")
   }
   else if(subCatSelect.subError=='not_update'){
     alert("Not Updated")
   }
   else if(subCatSelect.subError=='error'){
     alert("only Admin Can Update This Sub Category ")
   }
}, [subCatSelect])


console.warn('catData',catData)

 

 
console.warn('subCatData',subCatSelect.subCatData[0])

 
 






    return (
        <>

        <Header />
        
        <div id="layoutSidenav">
<Sidebar />


<div id="layoutSidenav_content">
                    <main>
                         <h1 className="mt-5" >Update Sub Category</h1>






                         <Form className="mb-3 form-pro">


                         <Form.Select  value={catId}  onChange={((e)=>setCatId(e.target.value))} >

 {catData.map((item,key)=>
subCatSelect.subCatData[0]?
item.cat_id==subCatSelect.subCatData[0].cat_id?<option key={key} value={item.cat_id}  >{item.cat_name}</option>:null
:null
)
 
                        } 

                         {
 
catData.map((item,key)=>
subCatSelect.subCatData[0]?
item.cat_id!=subCatSelect.subCatData[0].cat_id?<option key={key} value={item.cat_id}  >{item.cat_name}</option>:null:
null)     } 

 

</Form.Select>
 
    {subCatSelect.subCatData[0]? 
     subCatSelect.subCatData[0].id==id?
    <Form.Control type="text"   defaultValue={subCatSelect.subCatData[0].name}  className="mt-5 p-3 ip"  onChange={((e)=>setName(e.target.value))} placeholder="Enter Sub Category Name" />
    :
    
    <Form.Control type="text"     className="mt-5 p-3 ip"  onChange={((e)=>setName(e.target.value))} placeholder="Enter Sub Category Name" />
  
   :null
    
    }  <br />

         
       
   
    
     <Form.Select value={status}  className="ip" onChange={((e)=>setStatus(e.target.value))}>
    
    { subCatSelect.subCatData[0]?
      subCatSelect.subCatData[0].status==1? 
      <><option value = "1">Active</option><option value="0">Deactive</option> </>
      :
      <><option value="0">Deactive</option> <option value = "1">Active</option> </>
      : null
    }
    
    
   
    



  </Form.Select>
   
  <br />
    
    <div className="d-grid gap-2">
  <Button variant="primary" onClick={subCatUpdate} size="lg">
    Add Sub Category
  </Button>
  
</div>
 

 
  
</Form>















                       
                    </main>
                    
                </div>
 









</div>


        </>

    )
}

export default withRouter(UpdateSubCat);
