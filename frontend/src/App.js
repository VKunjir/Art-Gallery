import HomePage from './pages/HomePage.js';
import Account from './pages/Account.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArtDetails from './pages/ArtDetails.js';
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import AddArt from './components/AddArt.js';
import MyArt from './components/MyArt.js';
import Order from "./components/Order.js"
import MyOrder from "./components/MyOrder.js";
import { ToastContainer } from 'react-toastify';
import Cart from "./components/Cart.js";
import MyWishList from "./components/MyWishList.js"

function App() {

  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/home/:userID" element={<HomePage />} />
          <Route path="/" element = {<Login/>} />
          <Route path="/account/:userID" element={<Account />} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/wishlist/:userID" element={<MyWishList />} />
          <Route path="/addArt/:userID" element={<AddArt/>} />
          <Route path="/artdetail/:id" element={<ArtDetails />} /> 
          <Route path="/art/:userID" element={<MyArt/>} /> 
          <Route path="/order/:userID/:artsID" element={<Order/>} />
          <Route path="/myorder/:userID" element={<MyOrder/>} />
          <Route path="/cart/:userID" element={<Cart/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
