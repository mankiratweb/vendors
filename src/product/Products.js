import { useEffect, useState } from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar'; 
import {Table , Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


function Products(){

const [data , setData] = useState([]);
useEffect( ()=>{
    getData()

},[])








async function deltePro(id){
let result1 =  await fetch("http://127.0.0.1:8000/api/prodelete/"+id,{
    method:'DELETE'
});
result1 = await result1.json();
console.warn(result1);
getData();
}


async function getData(){
    let result  = await fetch("http://127.0.0.1:8000/api/list");
 result = await result.json();
 setData(result);

}








    return(
        <>
        <Header />
        
          <div id="layoutSidenav">
<Sidebar />
<div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Products</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item active">Products</li>
                         
                            <li  style={{marginLeft:40}} ><Link to="/add">Add </Link></li>
                        </ol>
                       
                     
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                         Products List
                            </div>
                            <div className="card-body">
                            <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th style={{width:100}}>Sno</th>
      <th style={{width:150}}>Name</th>
      <th style={{width:150}}>Price</th>
      
      <th style={{width:200}}>Image</th>
      <th style={{width:150}}>Category</th>
       
      <th style={{width:150}}>Status</th>
      <th style={{width:350}}>Action</th>
    </tr>
  </thead>
  <tbody>
    {
data.map((item , key)=>


<tr  key={key}>
      <td>{key+1}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td> <img className="pro-list-img" src ={"http://127.0.0.1:8000/"+item.image} /></td>
      <td>{item.cat}</td>
      <td>{item.status}</td>
      
      <td>
      <Link to={"update/"+item.id}  className="btn btnpro btn-success">Edit</Link>
      <Button   className=" btnpro btn-primary">Active</Button>
      <Button onClick={(()=>{deltePro(item.id)})} className=" btnpro btn-danger">Delete</Button>
      </td>
    </tr>




)



    }
    
  </tbody>
</Table>
                            </div>
                        </div>
                    </div>
                </main>
              
            </div>
 


</div>



        </>

    )
}


export default Products