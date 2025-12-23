import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Routing } from './Routing/Routing'
import Navbar from './Component/Navbar';
import PrivateRoute from './Component/PrivateRoute';
import Login from './pages/Login';
import './style.css'
function App() {
  return (
    
  <Router>
    <Navbar/>
    <Routes>
      <Route element={<PrivateRoute/>}>
      {
        Routing.map((ele)=>(
          <Route path={ele.path} element={<ele.element/>}/>
        ))
      }
      </Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
  </Router>
  )
}

export default App
