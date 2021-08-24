import Header from '../../common/Header';
import { withRouter , useHistory } from 'react-router';
import { Form , Button , Figure    } from 'react-bootstrap';
import Sidebar from '../../common/Sidebar'; 
import { useEffect, useState  } from 'react';



function UpdateProduct(props){


  const [catData , setCatData] = useState([]);
  let [data , setData] = useState("");

  useEffect( async ()=>{
   
    let result = await fetch("http://127.0.0.1:8000/api/productfind/"+props.match.params.id);
    result  = await result.json();
    setData(result);
 
},[])










useEffect( async ()=>{
let resultcat  = await fetch("http://127.0.0.1:8000/api/allcat");
   resultcat = await resultcat.json();  
   setCatData(resultcat);
 },[])
 
 
 



// alert(data.name)
  const history = useHistory();

const [name , setName] = useState(data.name);
let [price , setPrice] = useState(data.price);
const [cat , setCat] = useState(data.cat);
const [subCat , setSubCat] = useState(data.sub_cat);
const [image , setImage] = useState(data.image);
const [tag , setTag] = useState(data.tag);
const [sku , setSku] = useState(data.sku);
const [shortDesc , setShortDesc] = useState(data.short_desc);
const [qty , setQty] = useState("");
const [proViewType , setProViewType] = useState("");
const [stock , setStock] = useState("");
const user = JSON.parse(localStorage.getItem('user-info'))
const [longDesc , setLongDesc] = useState(data.long_desc);
const [featureSelect , setFeatureSelect]= useState(false)
const [topSelect , setTopSelect]= useState(false)
const [defaultSelect , setDefaultSelect]= useState(false)
 
const [status , setStatus] = useState(data.status);















async function update(id){
  
  console.warn(name,price,cat,subCat,longDesc , shortDesc , image , status , sku , tag );
  alert(data.price)
  
  const formData  = new FormData();
  if(name !=""){
    
    formData.append('name',name);
  }else{
    formData.append('name',data.name);
  }
  
if(price!=""){
  
formData.append('price',price);

}
else{
  formData.append('price',data.price);
}


if(cat==""){
  
  
  formData.append('cat',data.cat);
} 
else{
  formData.append('cat',cat);
}
if(subCat==""){
  
  
  formData.append('sub_cat',data.sub_cat);
}else{
  formData.append('sub_cat',subCat);
  
}


if(longDesc==""){
  
  formData.append('long_desc',data.long_desc);
}else{
  
  formData.append('long_desc',longDesc);
  
}

if(shortDesc==""){
  
  formData.append('short_desc',data.short_desc);
}else{
  
  
  
  formData.append('short_desc',shortDesc);
}


if(image==""){
  
  
  formData.append('image',data.image);
  
  
}else{
  
  formData.append('image',image);
}

if(sku==""){
  
  formData.append('sku',data.sku);
  
}else{
  formData.append('sku',sku);
}

if(status==""){
  
  
  formData.append('status',data.status);
  
}else{
  formData.append('status',status);
}

if(tag==""){
  
  formData.append('tag',data.tag);
}else{
  formData.append('tag',tag);
  
}
if(qty==""){
  
  formData.append('qty',data.qty);
}else{
  formData.append('qty',qty);
  
}




if(proViewType==""){
  
  formData.append('pro_view_type',data.pro_view_type);
}else{
if(proViewType=='f' || proViewType=='t' || proViewType =="d"){
  formData.append('pro_view_type',proViewType);
  

}

else{
  alert("Please Select Pro Type")
}


  
}
if(stock==""){
  
  formData.append('stock',data.stock);
}else{
  if(stock=='0' || stock=='1'){
    formData.append('stock',stock);

  }else{
    alert("please Select Stock");
     
  }
  
}

formData.append('user_id',user.id);
console.warn(formData)

  let result = await fetch("http://127.0.0.1:8000/api/productupdate/"+id+"?_method=PUT",{
 
    method:'POST',
    
    body: formData
  });
  result = await result.json();
  console.warn()
  
  if(result.result[0]=="Updated"){
    alert("Updated")
    history.push("/pro")
  }
  if(result.result[0]=="Failed"){
    alert("Not Updated")
  }
  
  
  
  
  
  
  
}







 


















    return(
        <>
        <Header />
        
          <div id="layoutSidenav">
<Sidebar />

    <div id="layoutSidenav_content">
                    <main>
                         <h1>Update Product</h1>





                         <Form>
  <Form.Group className="mb-3 form-pro"  controlId="formBasicEmail">
     
    <Form.Control type="text"  defaultValue={data.name}   onChange={((e)=>setName(e.target.value))} placeholder="Product Name" /><br />
   
    <Form.Control type='number' min="0"  defaultValue={data.price}  onChange={((e)=>setPrice(e.target.value))} placeholder=" Price" /><br />
    <Form.Control type="number" min="0" defaultValue={data.sku}  onChange={((e)=>setSku(e.target.value))}  placeholder="Sku" /><br />
    
    <Form.Control type='number' min="1"  defaultValue={data.qty}  onChange={((e)=>setQty(e.target.value))} placeholder="Qty" />``
     
    
    <br />



    <Form.Select defaultValue={data.stock}  onChange={((e)=>setStock(e.target.value))} >
    <option>Select Stock</option>
{
 data.stock=="0"?  <option value="0">Out of Stock</option>
 :<option value="1"> In of Stock   </option>

}
{
 data.stock=="1"?  <option value="1"> In of Stock   </option>
 :<option value="0">Out of Stock</option>

}


    
  
  </Form.Select>



 




    <Figure>
  <Figure.Image
    width={271}
    height={580}
    alt="171x180"
    src={"http://127.0.0.1:8000/"+data.image}
  />
  
</Figure>







    <Form.Control type="file" defaultValue={data.image}   onChange={((e)=>setImage(e.target.files[0]))} placeholder="Image" /><br />
    
    
    
    
    
    <Form.Select defaultValue={data.proViewType}  onChange={((e)=>setProViewType(e.target.value))} >
    <option> Select Type</option>

 
  

     <option  value="f"   >  Feature Product </option>
   <option value="t"   > Top Product</option>
    <option value="d"   > Default Product </option>
  </Form.Select>
    <br />
    
    
    
    
    
    
    
    
    
    <Form.Select  defaultValue={data.cat}  onChange={((e)=>setCat(e.target.value))} >
     




{  

catData.map((item ,key)=>



cat==item.cat_name?<option value={item.id} key={key}>{item.cat_name}</option>:
 

<option value={item.id} key={key}>{item.cat_name}</option>
)
}


    
  </Form.Select><br />










   <Form.Select defaultValue={data.sub_cat}  onChange={((e)=>setSubCat(e.target.value))}>
    <option>Sub Category Select</option>
    <option>Sub Category 2</option>
  </Form.Select> <br />
    <Form.Select defaultValue={data.tag}  onChange={((e)=>setTag(e.target.value))} >
    <option>Tag Select</option>
    <option>Tag Select 1</option>
    <option>Tag Select 2</option>
  </Form.Select><br />
    <Form.Control defaultValue={data.short_desc}  onChange={((e)=>setShortDesc(e.target.value))} placeholder="Short Desciption"  as="textarea" rows={3} /><br />
    <Form.Control as="textarea" placeholder="Long Description"  defaultValue={data.long_desc}  onChange={((e)=>setLongDesc(e.target.value))} rows={5} /><br />
    <Form.Select    onChange={((e)=>setStatus(e.target.value))}>
    
 { 
 
 data.status=="0" ?
 <option   value="1">Deactive</option> 
  

     :
     <option   value="1">Active</option> 
   
 
 }

{ 
 
 data.status=="1" ?
 <option   value="1">Deactive</option> 
 
 :
 <option   value="0">Active</option> 
   
 
 }

  
 
  
    
    
  </Form.Select><br />
  {
  
  status=="undefined"?data.status:null
  
  
  } 
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


export default withRouter(UpdateProduct);