import {  BrowserRouter, Route , Switch } from 'react-router-dom';
 
import Login from './login/Login';





import Logout from './login/Logout';
import Register from './login/Register';
import AddProduct from './product/AddProduct';
import  UpdateProduct from './product/UpdateProduct';
import Products from './product/Products';
import Protected from './login/Protected';
import Orders from './ecomm/Orders';
import Contacts from './ecomm/Contact'
import Users from './ecomm/Users';
import './App.css';
import './theme_asset/css/styles.css'
import Dashboard from './component/Dashboard';
 
 

function App() {
  return (
    <div className="App">
        
     
      <BrowserRouter>
       <Switch>

   
      <Route path="/login"><Login /></Route>
      <Route path="/logout"><Logout /></Route>
      
      <Route path="/register"><Register /></Route>
      <Route exact path="/"><Protected Cmp= {Dashboard} /></Route>
      <Route path="/update/:id"><Protected Cmp= {UpdateProduct} /></Route>
      <Route path="/pro"><Protected Cmp= {Products} /></Route>
      <Route path="/orders"><Protected Cmp= {Orders} /></Route>
      <Route path="/users"><Protected Cmp= {Users} /></Route>
      <Route path="/contact"><Protected Cmp= {Contacts} /></Route>
       
      <Route path="/add"><Protected Cmp= {AddProduct} /></Route>
  
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
