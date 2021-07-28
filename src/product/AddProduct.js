import Header from '../component/Header';
 
import { Form , Button    } from 'react-bootstrap';
import Sidebar from '../component/Sidebar'; 
import { useState } from 'react';
import { useHistory} from 'react-router-dom'

function AddProduct(){

const history = useHistory();
const [name , setName] = useState("");
const [price , setPrice] = useState("");
const [cat , setCat] = useState("");
const [subCat , setSubCat] = useState("");
const [image , setImage] = useState("");
const [tag , setTag] = useState("");
const [sku , setSku] = useState("");
const [shortDesc , setShortDesc] = useState("");
const [longDesc , setLongDesc] = useState("");
 
const [status , setStatus] = useState("");











async function productAdd(){
 
    console.warn(name,price,cat,subCat,longDesc , shortDesc , image , status , sku , tag );


 const formData  = new FormData();
 formData.append('name',name);
 formData.append('price',price);
 formData.append('cat',cat);
 formData.append('sub_cat',subCat);
 formData.append('long_desc',longDesc);
 formData.append('short_desc',shortDesc);
 formData.append('image',image);
 formData.append('sku',sku);
 formData.append('status',status);
 formData.append('tag',tag);
let result = await fetch("http://127.0.0.1:8000/api/addproducts",{
 
  method:'POST',
 
  body: formData
});
 
result =await  result.json();
 
if(result.result[0]=="Insert"){
history.push('/pro');
}
 




}

























    return(
        <>
        <Header />
        
          <div id="layoutSidenav">
<Sidebar />

    <div id="layoutSidenav_content">
                    <main>
                         <h1>Add Product</h1>





                         <Form>
  <Form.Group className="mb-3 form-pro"  controlId="formBasicEmail">
     
    <Form.Control type="text" value={name}  onChange={((e)=>setName(e.target.value))} placeholder="Product Name" /><br />

    <Form.Control type='number' min="0"  value={price}  onChange={((e)=>setPrice(e.target.value))} placeholder=" Price" /><br />
    <Form.Control type="number" min="0" value={sku}  onChange={((e)=>setSku(e.target.value))}  placeholder="Sku" /><br />
    


    <Form.Control type="file"    onChange={((e)=>setImage(e.target.files[0]))} placeholder="Image" /><br />
    <Form.Select value={cat}  onChange={((e)=>setCat(e.target.value))} >
    <option >Category Select</option>
    <option >Category Select 1</option>
    <option >Category Select 2</option>
  </Form.Select><br />
   <Form.Select value={subCat}  onChange={((e)=>setSubCat(e.target.value))}>
    <option>Sub Category Select</option>
    <option>Sub Category 2</option>
  </Form.Select> <br />
    <Form.Select value={tag}  onChange={((e)=>setTag(e.target.value))} >
    <option>Tag Select</option>
    <option>Tag Select 1</option>
    <option>Tag Select 2</option>
  </Form.Select><br />
    <Form.Control value={shortDesc}  onChange={((e)=>setShortDesc(e.target.value))} placeholder="Short Desciption"  as="textarea" rows={3} /><br />
    <Form.Control as="textarea" placeholder="Long Description"  value={longDesc}  onChange={((e)=>setLongDesc(e.target.value))} rows={5} /><br />
    <Form.Select value={status}  onChange={((e)=>setStatus(e.target.value))}>
    
    <option>Publish</option>
    <option>Active</option>
    <option>Deactive</option>
  </Form.Select><br />
    
    <div className="d-grid gap-2">
  <Button variant="primary" onClick={productAdd} size="lg">
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


export default AddProduct