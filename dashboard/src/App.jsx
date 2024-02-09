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



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/otp/:email" element={<OtpPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgetpassword" element={<ForgotPassword/>}></Route>
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
