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
} from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import CreateTask from './Components/CreateTask'
import CreateTaskModal from './Components/CreateTaskModel'

function App() {
     const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" >
        <Route path="signup" element={<SignUp/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="dashboard" element={<Dashboard/>}></Route>
        <Route path="createtask" element={<CreateTask/>}></Route>
        </Route>
      )
     )
  return (
<RouterProvider router={router}>

</RouterProvider>
  )
}

export default App
