import React , {useEffect ,useState} from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import {Table, Button} from 'react-bootstrap';
 import { Link} from 'react-router-dom';
  import {useDispatch,useSelector} from 'react-redux';
import { getAllSubCats,changeStatusAc, deleteSubcatAc } from '../../../../Services/Actions/SubCatAction';
import { SubscriptionsOutlined } from '@material-ui/icons';

function AllSubCat() {
    
    const [data , setData] = useState([]);
    const user = JSON.parse(localStorage.getItem('user-info'));
  const dispatch = useDispatch();
  const  subCatSelect= useSelector(state => state.subCatRaducer);
  const [error,setError]=useState('');
     
 
 


useEffect( () => {
  dispatch(getAllSubCats());
       }, [])
 

 useEffect(() => {
    console.warn('check',subCatSelect.subCatData)
     if(subCatSelect.subError=='deleted'){
       setError("delete successfuly")
      dispatch(getAllSubCats());
    }
  else  if(subCatSelect.subError=='already_delete'){
      setError('Already Deleted ')
    }
    else if(subCatSelect.subError=='status_changed'){
setError('Status changed successfully')
dispatch(getAllSubCats());
    }else if(subCatSelect.subError=='not_changed'){
setError("Status Can't Changed Contact Website Owner")
    }
    else if(subCatSelect.subError=='only_admin'){
      setError("Only Admin Can Change Status")
    }
    else if(subCatSelect.subError=='error'){
      setError("Some Techniqule Error Please Try Again Leater")
    }
 }, [subCatSelect])




 
 

 




 

 
console.warn("Empty",subCatSelect.subCatData)
 
    
    
 
    return (
        <>

        <Header />
        
        <div id="layoutSidenav">
<Sidebar />


<div id="layoutSidenav_content">
                    <main>
                    {error?<div className="alert alert-danger" role="alert"> {error} </div>:null}
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Sub Categories</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item active"> Sub Categories </li>
                         
                            <li  className="breadcrumb-item active"   ><Link to="/addsubcat">Add </Link></li>
                        </ol>
                       
                     
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                 Sub Categories
                            </div>
                            <div className="card-body">
                            <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th style={{width:100}}>Sno</th>
      <th style={{width:150}}>Sub Categories</th>
      <th style={{width:150}}>Categories</th>
     <th style={{width:150}}>Status</th>
      <th style={{width:350}}>Action</th>
    </tr>
  </thead>

  <tbody>
    {
       subCatSelect.subError== 'show_all_sub' ?
      
       subCatSelect.subCatData.map((item , key)=>


<tr  key={key}>
      <td>{key+1}</td>
      <td>{item.name}</td>
      <td>{item.cat_name}</td>
     
           
      <td>{
      
      item.status=='1' ?'Active' :'Deactive'
      
      }</td>
      
      <td>
      <Link to={"/updatesubcat/"+item.id}  className="btn btnpro btn-success">Edit</Link>
    {item.status=='0'?  <Button  onClick={(()=>{dispatch(changeStatusAc(item.id,user.id,user.role))})} className=" btnpro btn-primary">Active</Button> :
    <Button onClick={(()=>{dispatch(changeStatusAc(item.id,user.id,user.role))})} className=" btnpro btn-danger">Deactive</Button>

    }
      <Button  onClick={(()=>{dispatch(deleteSubcatAc(item.id,user.id,user.role))})} className=" btnpro btn-danger">Delete</Button>
      </td>
    </tr>




):null


 

    }
    
  </tbody>
</Table>

{subCatSelect.subError=='show_not'?

<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Empty Data ! Add New Sub Category</h4>
  </div>


:null}
                            </div>
                        </div>
                    </div>

 




                       
                    </main>
                    
                </div>
 









</div>


        </>
    )
}

export default AllSubCat
