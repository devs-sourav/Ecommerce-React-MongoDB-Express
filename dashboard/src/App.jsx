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
