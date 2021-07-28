import Header from '../component/Header';
import Sidebar from '../component/Sidebar'; 
import { Table  , Button } from 'react-bootstrap'
import { Link} from 'react-router-dom';

function Contacts(){


    return(
        <>
        <Header />
        
        <div id="layoutSidenav">
<Sidebar />

<div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Contact</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item active">Contact</li>
                        </ol>
                        <div className="card mb-4">
                            <div className="card-body">
                                DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
                                <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
                                .
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                         Contact List
                            </div>
                            <div className="card-body">
                            <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Sno</th>
      <th>Name</th>
      <th>Email</th>
      <th>Mobile</th>
      
      <th>Messeage</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      
      <td>@mdo</td>
      <td>@mdo</td>
      <td>@mdo</td>
      <td>


      <Button variant="success">Edit</Button>
      <Button variant="danger">Delete</Button>

      </td>
    </tr>
    
  </tbody>
</Table>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2021</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
 

</div>



        </>

    )
}


export default Contacts