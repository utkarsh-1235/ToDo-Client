import './index.css'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Pages/Login'
import SignUp from './Pages/Signup'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import CreateTask from './Components/CreateTask'
import CreateTaskModal from './Components/CreateTaskModel'

function App() {

  return (
   <Routes>
    
        <Route path="/" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/createtask" element={<CreateTask/>}></Route>
        
   </Routes>
  )
}

export default App
