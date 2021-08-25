import React, { Link } from 'react-router-dom';


function Sidebar() {


    return (


        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    {
                        localStorage.getItem('user-info') ?
                            <div className="nav">
                                <Link className="nav-link" to="/">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </Link>

                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#cotegories" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    categories
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>

                                <div className="collapse" id="cotegories" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">

                                        <Link className="nav-link collapsed" to="/allcat"  >
                                            All  Categories
                                        </Link>

                                        <Link className="nav-link collapsed" to="/addcat"  >
                                            Add Category
                                        </Link>



                                    </nav>
                                </div>






                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#subcategories" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Sub  Categories
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>

                                <div className="collapse" id="subcategories" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">

                                        <Link className="nav-link collapsed" to="/allsubcat"  >
                                            All Sub Categories
                                        </Link>

                                        <Link className="nav-link collapsed" to="/addsubcat"  >
                                            Add Sub Category
                                        </Link>



                                    </nav>
                                </div>










                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#tags" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Tag
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>

                                <div className="collapse" id="tags" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">

                                        <Link className="nav-link collapsed" to="/alltags"  >
                                            All  Tags
                                        </Link>

                                        <Link className="nav-link collapsed" to="/addtags"  >
                                            Add Tags
                                        </Link>



                                    </nav>
                                </div>

  



                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    product
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>


                                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">

                                        <Link className="nav-link collapsed" to="/pro"  >
                                            Products
                                        </Link>

                                        <Link className="nav-link collapsed" to="/add"  >
                                            Add Producnt
                                        </Link>


                                    </nav>
                                </div>
                                <Link className="nav-link collapsed" to="/orders"     >
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Orders

                                </Link>
                                <Link className="nav-link collapsed" to="/users"  >
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Users

                                </Link>
                                <Link className="nav-link collapsed" to="/contact"  >
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Contact

                                </Link>

                            </div>


                            :
                            <div className="nav">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </div>
                    }


                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>














    )
}


export default Sidebar