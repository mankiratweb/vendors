import { HashRouter, Route , Switch } from 'react-router-dom';
 
import Login from './login/Login';
 
import Register from './login/Register';
import AddProduct from './Pages/product/AddProduct';
import  UpdateProduct from './Pages/product/UpdateProduct';
import Products from './Pages/product/Products';
import Protected from './login/Protected';
import Orders from './Pages/Orders';
import Contacts from './Pages/Contact'
import Users from './Pages/Users';
import '../../App.css';
import './theme_asset/css/styles.css';
import '../adminPanel/theme_asset/js/scripts';
import Dashboard from './Pages/Dashboard';
import AddCategory from './Pages/categories/AddCategory';
 import ListCategories  from './Pages/categories/ListCategories';
 import UpdateCategories from './Pages/categories/UpdateCategories';
import SubCatAdd from './Pages/subCat/SubCatAdd';
import AllSubCat from './Pages/subCat/AllSubCat';
import UpdateSubCat from './Pages/subCat/UpdateSubCat';
import AllTags from './Pages/tags/AllTags';
import AddTags from './Pages/tags/AddTags';
import UpdateTag from './Pages/tags/UpdateTag';





function Home() {
  return (
    <div className="App">
        
     
      <HashRouter basename="/dashboard">
       <Switch>

   
      <Route path="/login"><Login /></Route>
      
      
      <Route path="/register"><Register /></Route>
      <Route exact path="/"><Protected Cmp= {Dashboard} /></Route>
      <Route path="/update/:id"><Protected Cmp= {UpdateProduct} /></Route>
      <Route path="/pro"><Protected Cmp= {Products} /></Route>
      <Route path="/add"><Protected Cmp= {AddProduct} /></Route>
      <Route path="/orders"><Protected Cmp= {Orders} /></Route>
      <Route path="/users"><Protected Cmp= {Users} /></Route>

      <Route path="/addcat"><Protected Cmp= {AddCategory} /></Route>
      <Route path="/allcat"><Protected Cmp= {ListCategories} /></Route>
      <Route path="/updatecat/:id"><Protected Cmp= {UpdateCategories} /></Route>


      <Route path="/contact"><Protected Cmp= {Contacts} /></Route>
     



      <Route path="/addsubcat"><Protected Cmp= {SubCatAdd} /></Route>
      <Route path="/allsubcat"><Protected Cmp= {AllSubCat} /></Route>
      <Route path="/updatesubcat/:id"><Protected Cmp= {UpdateSubCat} /></Route>


      <Route path="/addtags"><Protected Cmp= {AddTags} /></Route>
      <Route path="/alltags"><Protected Cmp= {AllTags} /></Route>
      <Route path="/updatetag/:id"><Protected Cmp= {UpdateTag} /></Route>
  
      </Switch>
      </HashRouter>
    </div>
  );
}

export default Home;
