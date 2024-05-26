import React from 'react'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path={'/'} element={<Login />}></Route>
        <Route path={'/home'} element={<Home />}></Route>
        <Route path={'/login'} element={<Login />}></Route>
        <Route path={'/signup'} element={<Signup />}></Route>
      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App