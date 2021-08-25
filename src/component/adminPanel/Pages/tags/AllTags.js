import React , {useEffect ,useState} from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import {Table, Button} from 'react-bootstrap';
 import { Link, withRouter} from 'react-router-dom';
 
import {useSelector , useDispatch} from 'react-redux';
import {deleteSingleTag, getAllTagAc, statusChangeTagButon} from '../../../../Services/Actions/TagAction'
import { LiveTvOutlined } from '@material-ui/icons';

function AllTags() {
const dispatch = useDispatch()
const tagsSel = useSelector((state) => state.TagRaducer.tagsData);
 
 let [user,setUser] =useState(localStorage.getItem('user-info')); 

 useEffect(() => {
  if(localStorage.getItem('user-info')!=='undefined'){
    
     const StorageUser = JSON.parse(user);
setUser(StorageUser)
     
 console.warn('user 2',user.id)
   }
 }, [localStorage.getItem('user-info')])
 


 




    useEffect(() => {
     
 dispatch(getAllTagAc());
    
      
       
    
     }, [])

     
 


  function deleteTag(id){
 if(user.id){
 
  dispatch(deleteSingleTag(id,user.id))
 
    dispatch(getAllTagAc());  
 }


 

}

  function statusChange(id){
console.warn('userId',user.id)
console.warn('user',user)
    if(user.id!=='undefined'){
      console.warn('userId',user.id)
      console.warn("status",dispatch(statusChangeTagButon(id,user.id)));
dispatch(getAllTagAc());
     }

    


 

    

}







    return (
        <>

        <Header />
        
        <div id="layoutSidenav">
<Sidebar />


<div id="layoutSidenav_content">
                    <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Tags</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item active"> Tags </li>
                         
                            <li  className="breadcrumb-item active"   ><Link to="/addtags">Add </Link></li>
                        </ol>
                       
                     
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                Tags
                            </div>
                            <div className="card-body">
                            <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th style={{width:100}}>Sno</th>
      <th style={{width:150}}>Tags</th>
      {/* <th style={{width:150}}>Categories</th> */}
     <th style={{width:150}}>Status</th>
      <th style={{width:350}}>Action</th>
    </tr>
  </thead>
  <tbody>
    {
tagsSel.map((item , key)=>


<tr  key={key}>
      <td>{key+1}</td>
      <td>{item.name}</td>
      {/* <td>{item.cat_name}</td> */}
     
           
      <td>{
      
      item.status=='1' ?'Active' :'Deactive'
      
      }</td>
      {
 
      }
      <td>
      <Link to={"/updatetag/"+item.id}  className="btn btnpro btn-success">Edit</Link>
     {item.status==0 ? <Button  onClick={(()=>{statusChange(item.id)})} className=" btnpro btn-primary">Active </Button>:<Button  onClick={(()=>{statusChange(item.id)})} className=" btnpro btn-danger">Deactive </Button> }
      <Button  onClick={(()=>{deleteTag(item.id)})} className=" btnpro btn-danger">Delete</Button>
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

export default withRouter(AllTags);
