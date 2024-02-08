import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Registration from './components/Registration';








function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/registration" element={<Registration/>}></Route>
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
