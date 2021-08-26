import Header from '../../common/Header';
import { Form,Image, Alert, FloatingLabel, Button, Tab, Col, Nav, Row, Accordion } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from '../../common/Sidebar';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox, Hidden } from '@material-ui/core';
 


import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import { ImageAlt, NodeMinusFill } from 'react-bootstrap-icons';



function AddProduct() {

  const history = useHistory();
  let [name, setName] = useState("");
  let [price, setPrice] = useState();
  let [salePrice, setSalePrice] = useState(null);

  // const scrollContainerStyle = { width: "200px", maxHeight: "100px" };
  // Start cat Variable 
  let [cat, setCat] = useState("");
  let [catStatus, setCatStatus] = useState(false);
  let [newCat, setNewCat] = useState(false);

  // End cat Variable 

  // Start Sub Categories Variable 
  let [subCat, setSubCat] = useState([]);

  let [subCatStatus, setSubCatStatus] = useState(false);
  let [subCatParentStatus, setSubCatParentStatus] = useState(false);
  let [subCatParentId, setSubCatParentId] = useState('');
  let [newSubCat, setNewSubCat] = useState('');
  let [subCatOptions, setSubCatOptions] = useState([]);
  // End Sub Categories Variable


  // Start Tags Variable 

  let [tagData, setTagData] = useState([]);
  let [tag, setTag] = useState([]);

  let [tagStatus, setTagStatus] = useState(false);
  let [newtag, setNewTag] = useState("");

  // End Tags Variable



//Gallery

let [galleryPreview,setGalleryPreview] = useState([]);
let [gallery, setgallery] = useState([]);
let [galleryId,setGalleryId]=useState();

//End Gallery



//Start Image

  let [image, setImage] = useState("");
  let [imageId, setImageId] = useState(null);
  let [imagePreview, setImagePreview] = useState("");


 



//End Image
 

  let [sku, setSku] = useState();
  let [shortDesc, setShortDesc] = useState("");
  let [longDesc, setLongDesc] = useState("");
  let [status, setStatus] = useState("");
  let [qty, setQty] = useState("");
  let [proViewType, setProViewType] = useState("");
  const [stock, setStock] = useState();
  const user = JSON.parse(localStorage.getItem('user-info'));
  let [subCatData, setSubCatData] = useState([]);

 

  let [catData, setCatData] = useState([]);

  let [weight, setWeight] = useState("");
  let [width, setWidth] = useState("");
  let [height, setHeight] = useState("");
  let [lenght, setLenght] = useState("");
  let [purchaseNote, setPurchaseNotes] = useState("");

  let [error, setError] = useState('');
  let [stockManage, setStockManage] = useState(false);
  let [reviewStatus, setReviewStatus] = useState(false);
  const attrTemplate = { size: "", color: "", type: "" };
  const [attrs, setAttrs] = useState([attrTemplate]);
  const addAttr = () => {
    setAttrs([...attrs, attrTemplate])
  }





  useEffect(() => {

    allCat();
    allTags()
    subCatFun();


  }, [])


  const onChange = (e, index) => {


    const updateattrs = attrs.map((user, i) =>
      index == i ? Object.assign(user, {
        [e.target.name]: e.target.value,


      })
        : user)
    setAttrs(updateattrs)
  };


  // console.warn('Stock Manage', stockManage)




  const removeAttr = (index) => {
    const filterattr = [...attrs];
    filterattr.splice(index, 1);
    setAttrs(filterattr);
  }



function setCatFun(e){
 
  setCat(e.target.value);
 if(cat!=0 && cat!=''){
   
   setError("Please Select Category")
  }else{
   setError('');
  
 }
  
  
}

function setNameFun(e){
  
  setName(e.target.value);
 if(name==""){
  setError("Please Enter Product Name")
    
 }else if(name!=''){
   setError('')
 }
  
  
}




  async function allCat() {
    let result = await fetch("http://127.0.0.1:8000/api/allcat");
    result = await result.json();
    setCatData(result);

    subCatFun()
  }


  async function allTags() {
    let result = await fetch("http://127.0.0.1:8000/api/alltags");
    result = await result.json();
    setTagData(result);
    // console.log(result)
    subCatFun()

  }





  ///ADD New Categories




  async function addNewCat() {

    const formData = new FormData();
    // console.log("Cat", newCat)
    if (newCat == '' || newCat == null) {
      formData.append('new_cat_name', null);


    } else {
      formData.append('new_cat_name', newCat);
      setNewCat(null);
      formData.append('status', 1);
      formData.append('user_id', 1);


      let result = await fetch("http://127.0.0.1:8000/api/addcat", {

        method: 'POST',

        body: formData
      });

      result = await result.json();
      // console.warn(result);
      allCat();
      subCatFun()


    }



  }



  ///End Add New Categories


  // Start New Sub Cartegory



  async function addNewSubCat() {

    const formData = new FormData();
    if(newSubCat==''){
      setError("Please Enter Sub Category Name")
    
    }else{

      formData.append('name', newSubCat);
    }


    if (cat != '' && newSubCat != '') {

      formData.append('user_id', 1);
      formData.append('cat_id', cat);
      formData.append('status', 1);



    
// setError("");

if(subCatParentId!='' && subCatParentId!=null && subCatParentId!=0 ){

  formData.append('parent_id', subCatParentId);
  subCatFun();
}else
{
  formData.append('parent_id',0);
}
 
      let result = await fetch("http://127.0.0.1:8000/api/addsubcat",
        {
          method: "POST",
          body: formData
        }

      );
      result = await result.json();


      
      console.warn("check",result)




      if (result.result == "Inserted") {
setError('');
        subCatFun();
        
      }
      else if (result.result == "a") {
        setError("Sub Category Alerady Exist")
      }


    }


  }



  // End  Add New Sub categories

 

  // Start get  Sub Cat Change Options
  let subCatvalue = subCat;

  function getSubCatValue(e) {

    if (e.target.checked == true) {

      subCatvalue.push(e.target.value);

    }
    else {

      subCatvalue.map((itm, i) =>

        itm == e.target.value ? subCatvalue.splice(i, 1) : null


      )


    }
    // console.log("Data", subCatvalue);

  }


 
  // End get Sub Cat Chnage Options 




  // Start get  Tag Change Options
  let tagValue = tag;

  function getTagValue(e) {

    if (e.target.checked == true) {

      tagValue.push(e.target.value);

    }
    else {

      tagValue.map((itm, i) =>

        itm == e.target.value ? tagValue.splice(i, 1) : null


      )


    }
    // console.log("Tag Data", tagValue);

  }


 
  // End get Sub Cat Chnage Options 






  // Start Add Tags 


  async function addTag() {


    const formData = new FormData();
  



if(newtag==''){
setError("Please Enter Your Tag Name");
}else{
  setError('');
}


    if (newtag != '' && cat) {
      
      formData.append('user_id', 1);
      formData.append('name', newtag);
      formData.append('cat_id', cat);


      let result = await fetch("http://127.0.0.1:8000/api/addtag",
        {
          method: "POST",
          body: formData
        }

      );
      result = await result.json();

      // console.warn("tag", result);


      if (result.result[0] == "Inserted") {
        allTags()
      }

      if (result.result[0] == "a") {
        setError("This Tag is Already Exits");
      }


    }
 

  }









 

  async function subCatFun() {
    let result;

    if (cat == '' || cat == null || cat == '0') {
      result = await fetch("http://127.0.0.1:8000/api/allsubcat/");
    } else {
      result = await fetch("http://127.0.0.1:8000/api/findsubcatpro/" + cat);
    }
    result = await result.json();
    setSubCatOptions(result)


    console.warn("subcat", subCatOptions)






  }















async function galleryFun(e){
  
setgallery(e.target.files);
const formData  = new FormData();

console.warn('gallery',e.target.files)
  if (e.target.files== "" || e.target.files == null) {
    formData.append('gallery',null);
  }

  else {
Array.from(e.target.files).map((itm,i)=>
formData.append("gallery[]",itm)


)
formData.append("user_id",1);

let result = await fetch("http://127.0.0.1:8000/api/addgallery",{
  method: 'POST',
  body: formData
})

result = await result.json();


 
console.warn("Result",result.id)
setGalleryPreview(result.images);
console.warn("galleryPreview",result.images)
setGalleryId(result.id);

  }



}


 ///Start Image Fun


async function imageFun(e){

const formData = new FormData();

formData.append('user_id',1);
 

setImage(e.target.files[0]);
 
if(e.target.files[0])
{
 

formData.append('image',e.target.files[0]);
let result = await fetch("http://127.0.0.1:8000/api/addimage",{
  method:"POST",
  body:formData
});

result = await result.json();

setImageId(result.data[0].id);
setImagePreview(result.data[0].image);
console.warn("image id",result.data[0].id)
console.warn("image ",result.data[0].image)
if(result.data[0].id!=null && result.data[0].id!=''){
  setError('');
}else{
setError("Please Select Other Image")
setImageId('');
setImagePreview('');
}
 
}  
}






//  End Image Function
























  async function productAdd() {
    

    const formData = new FormData();

    // console.warn(attrs)



    if (longDesc == "" || longDesc == null) {

      formData.append('long_desc', null);
   
    }

    else {
   

      formData.append('long_desc', longDesc);

    }

    if (name == "") {
      setError("Please Enter Product Name");

    }
    else {
      formData.append('name', name);
       
    }

 
    if (price == "" || price == null) {

      formData.append('price', null);
    }
    else {
      formData.append('price', price);
      
    }


    if (salePrice == "" || salePrice == null) {
      formData.append('sale_price', '');
    }
    else {
      if (salePrice < price) {
        formData.append('sale_price', salePrice);
        

      } else {

        setError('Please Enter Valid Sale Price')
      }

    }



    if (sku == '' || sku == null) {
     
      formData.append('sku', null);
    } else {
   
      formData.append('sku', sku);
    }

  if (stockManage == false) {
   
      formData.append('stock_manage', 0);
    } else {
    
      formData.append('stock_manage', 1);
    }

    if (qty == "" || qty == null) {
      formData.append('qty', null);
      
    }
    else {
      
      formData.append('qty', qty);

    }


    if (stock == 1 || stock == 0) {
      formData.append('stock_status', stock);
     
    }
    else {
      
      formData.append('stock_status', null);
    }

 
    if (width == '') {
      formData.append('width', '');
       
    } else {
  
      formData.append('width', width);
    }


    if (height == '') {
      formData.append('height', '');
    } else {
      formData.append('height', height);
    }


    if (lenght == '') {
      formData.append('length', '');
    }
    else {
      formData.append('length', 'length');
    }




    if (weight == '') {
      formData.append('weight', '');
    } else {
      formData.append('weight', weight);
    }

    console.warn("checka",attrs[0]['size'])


    if (!attrs[0]['size'] && !attrs[0]['color'] && !attrs[0]['type']) {
      formData.append('attrs','');



    }
    else {

      // console.warn('atttrs',attrs)
      attrs.map((val, key) => {
 
        formData.append("attrs[size][]", val.size)
        formData.append("attrs[type][]", val.type)
        formData.append("attrs[color][]", val.color)

        




      }

      )
    }



    if (purchaseNote == '' || purchaseNote == null) {

      formData.append('purchase_notes', "");
       
    }
    else {
   
      formData.append('purchase_notes', purchaseNote);

    }

    if (reviewStatus == '' || reviewStatus == false) {
      formData.append('review_status', 0);
    }
    else {
      formData.append('review_status', 1);

    }




    if (shortDesc == "" || shortDesc == null) {
      formData.append('short_desc', '');
    }
    else {

      formData.append('short_desc', shortDesc);

    }




    if (proViewType == "f" || proViewType == "t" || proViewType == "d") {
      formData.append('pro_view_type', proViewType);

    }
    else {
      formData.append('pro_view_type', 'd');
    }



    if (status == "1" || status == '0') {
      formData.append('status', status);

    } else {
      formData.append('status', '1');
    }



    if (cat == "" || cat == null) {
      setError("Please Select Category")
    }
    else {
    
      formData.append('cat', cat);

    }

    if (subCatvalue == "" || subCatvalue == '0') {
      formData.append('sub_cat[]', ["null"]);

    }
    else {



      formData.append('sub_cat[]', subCatvalue);
    }



    if (tag == "" || tag == null) {
      formData.append('tag_id', null);
    } else {
      formData.append('tag_id', tag);
    }



    if (imageId == "" || image == null || image=='') {
      setError("Please Select Image");
    }

    else {

      formData.append('image_id', imageId);

    }
    
 if(galleryId=='' , galleryId ==null){

formData.append('gallery_id','')

 }
 else{
   formData.append('gallery_id',galleryId)
 }








    formData.append('user_id', 1);



    if (name != '' && price != '' && image != '' && cat!='' && cat!=0 && cat!=null) {


setError("");


      let result = await fetch("http://127.0.0.1:8000/api/addproducts", {

        method: 'POST',

        body: formData
      });


      result = await result.json();
 
         history.push('/pro')
       






    }





  }







  return (
    <>
      <Header />

      <div id="layoutSidenav">
        <Sidebar />

        <div id="layoutSidenav_content">
          <main>




         {   error=="Please Enter Product Name" || error=='Please Enter Valid Sale Price' || error=='Please Select Category'  || error=='Please Select Image' || error=="Please Select Other Image" ? 
          <Alert className='bg-danger text-light'>
              <h4>{error}</h4>
            </Alert>: 
            null }

            <h1 >Add new product</h1>

            <br />

            <Form className="pro-form">
              <Row>

                <Col xs="8">
                  <Form.Group className="mb-3  pro-add" controlId="formBasicEmail">

                    <Form.Control type="text" value={name} onChange={((e) => setNameFun(e))} placeholder="Product Name" />
                    <br />


                    <Form.Control as="textarea" placeholder="Long Description" value={longDesc} onChange={((e) => setLongDesc(e.target.value))} rows={15} />
                    <br />



                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                      <Row>
                        <Col sm={2}>
                          <Nav variant="pills" className="flex-column">
                            <Nav.Item aria-selected="false" className="pro-nav-bar ">
                              <Nav.Link eventKey="general" >General</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="inventory">Inventory</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="shipping">Shipping</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="attributes">Attributes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="advanced">Advanced</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={10}>
                          <Tab.Content>
                            <Tab.Pane eventKey="general">
                              <Row >
                                <Col xs="4">      Regular price ($) </Col>
                                <Col xs="8">
                                  <Form.Control type='number' min="0" value={price} onChange={((e) => setPrice(e.target.value))} placeholder=" Price" />

                                </Col>

                              </Row> <br />
                              <Row >
                                <Col xs="4">      Sale price ($) </Col>
                                <Col xs="8">
                                  <Form.Control type='number' min="0" value={salePrice} onChange={((e) => setSalePrice(e.target.value))} placeholder=" Sale Price" />

                                </Col>

                              </Row>






                            </Tab.Pane>
                            <Tab.Pane eventKey="inventory">

                              <Row  >
                                <Col xs="4">

                                  <span className="text-muted">SKU  </span>   <br />
                                </Col>
                                <Col xs="8" className="inv-pro">
                                  <Form.Control type="number" min="0" value={sku} onChange={((e) => setSku(e.target.value))} placeholder="Sku" />
                                  <span className="error">{error == "Please Enter SkU" ? error : null}</span>
                                  <br />

                                </Col>

                              </Row>
                              <Row  >
                                <Col xs="4">

                                  <span className="text-muted">Manage stock? </span>   <br />
                                </Col>
                                <Col xs="7"  >
                                  <Form.Check
                                    type="checkbox"
                                    onChange={((e) => setStockManage(e.target.checked))}

                                    label="Enable stock management at product level "
                                  />


                                </Col>

                              </Row>  <br />

                              {stockManage == true ?
                                <Row >
                                  <Col xs="4">
                                    <br />

                                    <span className="text-muted mt-4">Quantity</span>

                                  </Col>
                                  <Col className="inv-pro" xs="8">

                                    <br />
                                    <Form.Control type='number' min="1" value={qty} onChange={((e) => setQty(e.target.value))} placeholder="Qty" />
                                    <br /><br />
                                  </Col>

                                </Row> : null
                              }
                              <br />




                              <Row >
                                <Col xs="4">


                                  <span className="text-muted"> Stock Status </span>
                                </Col>
                                <Col className="inv-pro" xs="8">



                                  <Form.Select value={stock} onChange={((e) => setStock(e.target.value))} >

                                    <option value="1"> In of Stock   </option>
                                    <option value="0">Out of Stock</option>
                                  </Form.Select>
                                </Col>

                              </Row>



                            </Tab.Pane>





                            <Tab.Pane eventKey="shipping">

                              <Row >
                                <Col xs="12">
                                  <FloatingLabel controlId="floatingInputGrid" label="Weight">
                                    <Form.Control onChange={((e) => setWeight(e.target.value))} type="text" placeholder="Weight" />
                                  </FloatingLabel>
                                </Col>


                              </Row> <br />
                              <Row >
                                <Col xs="4">
                                  <FloatingLabel controlId="floatingInputGrid" label="Width">
                                    <Form.Control onChange={((e) => { setWidth(e.target.value) })} type="text" placeholder="Width" />
                                  </FloatingLabel>
                                </Col>
                                <Col xs="4">
                                  <FloatingLabel controlId="floatingInputGrid" label="Height">
                                    <Form.Control value={height} onChange={((e) => { setHeight(e.target.value) })} type="text" placeholder="Height" />
                                  </FloatingLabel>
                                </Col>
                                <Col xs="4">
                                  <FloatingLabel controlId="floatingInputGrid" label="Lenght">
                                    <Form.Control value={lenght} onChange={((e) => setLenght(e.target.value))} type="text" placeholder="Lenght" />
                                  </FloatingLabel>
                                </Col>


                              </Row>


                            </Tab.Pane>
                            <Tab.Pane eventKey="attributes">
                              {

                                attrs.map((item, index) =>

                                  <Row key={index} className="mb-4" >

                                    <Col xs="3">
                                      <FloatingLabel controlId="floatingInputGrid" label=" size">
                                        <Form.Control value={item.name} name="size" onChange={e => onChange(e, index)} size="sm" label="Size" type="text" />
                                      </FloatingLabel>
                                    </Col>
                                    <Col xs="3">
                                      <FloatingLabel controlId="floatingSelectGrid" label="colors">
                                        <Form.Select name="color" onChange={e => onChange(e, index)} value={item.color} aria-label="Floating label select example">
                                          <option> select </ option>
                                          <option >Red</option>
                                          <option >Green</option>
                                          <option >Blue</option>
                                          <option >Yellow</option>
                                        </Form.Select>
                                      </FloatingLabel>

                                    </Col>
                                    <Col xs="3">
                                      <FloatingLabel controlId="floatingInputGrid" label="type">
                                        <Form.Control onChange={e => onChange(e, index)} value={item.type} name="type" size="sm" label="type" type="text" />
                                      </FloatingLabel>
                                    </Col>

                                    <Col xs="2">

                                      <DeleteOutlinedIcon onClick={() => removeAttr(index)}></DeleteOutlinedIcon>

                                    </Col>


                                  </Row>
                                )
                              }

                              <Row>
                                <Col xs="3">
                                  <Button className="publish-btn" onClick={addAttr} variant="primary"  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>


                            </Tab.Pane>
                            <Tab.Pane eventKey="advanced">


                              <Row>
                                <Col >
                                  <Form.Control value={purchaseNote} onChange={((e) => setPurchaseNotes(e.target.value))} placeholder="Purchase Notes" as="textarea" rows={3} /> <br />
                                </Col>
                              </Row>
                              <Row>

                                <Col xs="4">

                                  <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    onChange={((e) => setReviewStatus(e.target.checked))}
                                    label="Enable Review"
                                  /></Col>

                              </Row>


                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                    <br />
                    <Form.Control value={shortDesc} onChange={((e) => setShortDesc(e.target.value))} placeholder="Short Desciption" as="textarea" rows={10} />




                  </Form.Group>

                </Col>
                <Col xs="4">

                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Publish</Accordion.Header>
                      <Accordion.Body>

                        <Button className="preview-btn" variant="primary" size="lg">
                          Perview
                        </Button>
                        <br /> <br />
                        <Form.Select value={proViewType} onChange={((e) => setProViewType(e.target.value))} >
                          
                          <option value="d"> Default Product </option>
                          <option value="f">  Feature Product </option>
                          <option value="t"> Top Product</option>
                        </Form.Select>
                        <br />
                        <Form.Select value={status} onChange={((e) => setStatus(e.target.value))}>

                        
                          <option value="1">Active</option>
                          <option value="0" >Deactive</option>

                        </Form.Select> <br />

                        <Button className="publish-btn" variant="primary" onClick={productAdd} size="lg">
                          Publish
                        </Button>



                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <br /><br />
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Categories</Accordion.Header>
                      <Accordion.Body >

                        <Row >

                          <Col xs="12">
                            <Form.Select value={cat} onChange={((e) => setCatFun(e))} >
                              <option value='0'>Select Category</option>
                              {

                                catData.map((item, i) =>

                                  <option value={item.id} key={i}>{item.cat_name}</option>

                                )

                              }

                            </Form.Select>



                          </Col>
                        </Row>



                        

 








                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>





                  <Accordion className="mt-5" defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header> Sub Categories  



                      </Accordion.Header>
                      <Accordion.Body>
                      <span className="text-danger ">{error=='Sub Category Alerady Exist' || error =="Please Enter Sub Category Name" ? error : null} </span> <br />
<Row>


                        {




                          subCatOptions.map((sub, itm) =>

                            sub.cat_id == cat ?<Col xs={4}><Form.Check  className="overText" key={itm} value={sub.id} onChange={((e) => getSubCatValue(e))} label={sub.name} /> </Col>: null




                          )


                        }
                        </Row>




                        {

                          subCatStatus==true ? <>
                            <Row className="mt-3">
                              <Col >
                                <Form.Control onChange={((e) => setNewSubCat(e.target.value))} placeholder="New Sub Category" /> <br />
                              </Col>
                            </Row>




                            {
                              subCatParentStatus && cat && cat != 0 ?
                                <Row className="mb-4">

                                  <Col xs="12">
                                    <Form.Select value={cat} onChange={((e) => setSubCatParentId(e.target.value))} >
                                      <option value="0" >Select Sub Parent Category</option>
                                      {
                                        subCatOptions.map((item, key) =>
                                          item.cat_id == cat ? <option value={item.id} key={key}>{item.name}</option> : null
                                        )
                                      }


                                    </Form.Select>



                                  </Col>
                                </Row> : null




                            }







                         

                            {cat && cat != 0 ? <span  > Your   Category is  {catData.map((itm, i) =>
                              itm.id == cat ? <strong>: {itm.cat_name}</strong> : null

                            )
                            }</span> :
                              <span className="text-danger"> <strong>Please Select Category</strong> </span>
                            }




                            <Row>
                              <Col >
                                <Button className="publish-btn mt-2" onClick={addNewSubCat} variant="warning" size="lg">
                                  ADD
                                </Button>
                              </Col>
                            </Row>

                            <Row>
                              <Col className="mt-3" xs="8">


                                <Form.Check
                                  type="checkbox"
                                  id="autoSizingCheck"
                                  onChange={((e) => setSubCatParentStatus(e.target.checked))}
                                  label="Sub Parent Category Select"
                                />


                              </Col>
                            </Row>

                          </>
                            : null

                        }




                        <Row>
                          <Col className="mt-3" xs="8">


                            <Form.Check
                              type="checkbox"
                              id="autoSizingCheck"
                              onChange={((e) => setSubCatStatus(e.target.checked))}
                              label="+ Add new  Sub category"
                            />


                          </Col>
                        </Row>




















                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <br /><br />
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header> Tags </Accordion.Header>
                      <Accordion.Body>
                      <span className="text-danger ">
                        {
                        error=='Please Enter Your Tag Name'  || error=="This Tag is Already Exits" ? error : null} 
                        </span>  
                         <Row style={{overflow:'hidden' }}>
                        {
 
tagData.map((tag, itm) =>

tag.cat_id == cat ?<Col xs="4"><Form.Check className="overText" key={itm} value={tag.id}   onChange={((e) => getTagValue(e))} label={tag.name}   /> </Col> : null
 
)


} 
</Row>
 



 

 
   {

                          tagStatus ? <>
                            <Row className="mt-3">
                              <Col >
                                <Form.Control onChange={((e) => setNewTag(e.target.value))} placeholder="Enter New Tag Name" /> <br />
                              </Col>
                            </Row>



                            {cat && cat != 0 ? <span  > Your   Category is  {catData.map((itm, i) =>
                              itm.id == cat ? <strong>: {itm.cat_name}</strong> : null

                            )
                            }</span> :
                              <span className="text-danger"> <strong>Please Select Category</strong> </span>
                            }





                            <Row>
                              <Col >
                                <Button className="publish-btn" onClick={addTag} variant="warning" size="lg">
                                  ADD
                                </Button>
                              </Col>
                            </Row>



                          </>
                            : null

                        }




                        <Row>
                          <Col className="mt-3" xs="5">


                            <Form.Check
                              type="checkbox"
                              id="autoSizingCheck"
                              onChange={((e) => setTagStatus(e.target.checked))}
                              label="+ Add new  Tag"
                            />


                          </Col>
                        </Row>












                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <br /><br />
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Product </Accordion.Header>
                      <Accordion.Body>

                        <Form.Group controlId="formFile" className="mb-3">



{imagePreview?

<Row>
    <Col xs={6} md={4}>
      <Image  className="mb-4" width={300} src={"http://127.0.0.1:8000/"+imagePreview} rounded />
    </Col>
   
  </Row>
:null

}



                          <Form.Control  type="file" onChange={((e) =>  imageFun(e))} placeholder="Image"  />
                        </Form.Group>

                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <br /> <br />

                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Products Gallery</Accordion.Header>

                      <Accordion.Body>
 
                      <Row className="mr-4">                 {

galleryPreview?

galleryPreview.map((itm,i)=>
i<10?
 
<Col className="mr-4 " key={i} xs={4} >
  <Image className="mr-4 mb-2 mt-2 "  width={100} src={"http://127.0.0.1:8000/"+itm} rounded />
</Col>: null
  

)  
 
: null


                        }</Row>
                      
                        <span>{error=="Show only 4 Images"?error:null}</span>

                        <Form.Group controlId="formFileMultiple" className="mb-3 mt-4">

                          <Form.Control type="file" onChange={((e) => galleryFun(e))} placeholder="Image" multiple />
                        </Form.Group>

                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>











                </Col>


              </Row>



























            </Form>
















          </main>

        </div>


      </div>



    </>

  )
}


export default AddProduct