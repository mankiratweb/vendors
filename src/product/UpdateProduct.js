import Header from '../component/Header';
import { withRouter , useHistory } from 'react-router';
import { Form , Button , Figure    } from 'react-bootstrap';
import Sidebar from '../component/Sidebar'; 
import { useEffect, useState  } from 'react';



function UpdateProduct(props){



  const history = useHistory();
const[data , setData] = useState("");
 
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






useEffect( async ()=>{
    let result = await fetch("http://127.0.0.1:8000/api/productfind/"+props.match.params.id);
    result  = await result.json();
    setData(result);
setName(data.name);setPrice(data.price) ;  
setCat(data.cat) ; setSubCat(data.sub_cat) ; 
  setShortDesc(data.short_desc) ; 
setSku(data.sku) ; setLongDesc(data.long_desc) ; 
setTag(data.tag) ; setStatus(data.status) ; 












    
},[])
console.warn(data)











 











async function update(id){
 
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
    






    <Figure>
  <Figure.Image
    width={171}
    height={180}
    alt="171x180"
    src={"http://127.0.0.1:8000/"+data.image}
  />
  
</Figure>







    <Form.Control type="file" defaultValue={data.image}   onChange={((e)=>setImage(e.target.files[0]))} placeholder="Image" /><br />
    <Form.Select  defaultValue={data.cat}  onChange={((e)=>setCat(e.target.value))} >
    <option >Category Select</option>
    <option >Category Select 1</option>
    <option >Category Select 2</option>
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
    <Form.Select defaultValue={data.status}  onChange={((e)=>setStatus(e.target.value))}>
    
    <option>Publish</option>
    <option>Active</option>
    <option>Deactive</option>
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


export default withRouter(UpdateProduct);