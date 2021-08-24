import { useEffect, useState } from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function ListCategories() {

    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem('user-info'));
    useEffect(() => {
        getData();

    }, [])


   async function statusChange(id) {

        let result = await fetch("http://127.0.0.1:8000/api/catstatuschange/"+id+"/"+ user.id+"/"+user.role+"?_method=PUT",
            {
                method: "POST",

            });
           
            console.warn(result);

            if(result==4){
              
                alert('You Can Change Status Only Your Category');
            }else{
            }
            getData();
            


    }





    async function deleteCat(id) {
        let result = await fetch("http://127.0.0.1:8000/api/deletecat/" + id + "/" + user.id + "/" + user.role, {
            method: 'DELETE'
        });
        result = await result.json();
        if (result == 1) {
            getData();
        } else {
            alert("You Can delete Only Your Category");
        }

    }


    async function getData() {
        let result = await fetch("http://127.0.0.1:8000/api/allcat");
        result = await result.json();
        setData(result);

    }








    return (
        <>
            <Header />

            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Categories</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                <li className="breadcrumb-item active"> Categories </li>

                                <li className="breadcrumb-item active"   ><Link to="/addcat">Add </Link></li>
                            </ol>


                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-table me-1"></i>
                                    Categories
                                </div>
                                <div className="card-body">
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 100 }}>Sno</th>
                                                <th style={{ width: 150 }}>Name</th>


                                                <th style={{ width: 200 }}>Image</th>


                                                <th style={{ width: 150 }}>Status</th>
                                                <th style={{ width: 350 }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((item, key) =>


                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td>{item.cat_name}</td>

                                                        <td>

                                                            {item.cat_file ? <img className="pro-list-img" src={"http://127.0.0.1:8000/" + item.cat_file} />
                                                                : null
                                                            }
                                                        </td>

                                                        <td>{item.status==1?"Active":"Deactive" }</td>

                                                        <td>
                                                            <Link to={"updatecat/" + item.id} className="btn btnpro btn-success">Edit</Link>

                                                            {item.status == 0 ? <Button onClick={(() => { statusChange(item.id) })} className=" btnpro btn-primary">Active</Button> : <Button onClick={(() => { statusChange(item.id) })} className=" btnpro btn-danger">Deactive</Button>}


                                                            <Button onClick={(() => { deleteCat(item.id) })} className=" btnpro btn-danger">Delete</Button>
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


export default ListCategories