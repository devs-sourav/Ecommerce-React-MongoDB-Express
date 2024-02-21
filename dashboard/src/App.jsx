import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Registration from './components/Registration';
import OtpPage from './components/OtpPage';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import UserList from './components/UserList';
import Merchant from './components/Merchant';
import AddProduct from './components/AddProduct';
import AddCategory from './components/AddCategory';
import AllCategory from './components/AllCategory';

// http://localhost:5173/changepassword/${token}

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/otp/:email" element={<OtpPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgetpassword" element={<ForgotPassword/>}></Route>
        <Route path="/changepassword/:emailToken" element={<ChangePassword/>}></Route>
        <Route path="/" element={<Home />}>
          <Route path="userlist" element={<UserList/>}></Route>
          <Route path="merchant" element={<Merchant/>}></Route>
          <Route path="addproduct" element={<AddProduct/>}></Route>
          <Route path="addcategory" element={<AddCategory/>}></Route>
          <Route path="allcategory" element={<AllCategory/>}></Route>
        </Route>
      </Route>
      
  
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
