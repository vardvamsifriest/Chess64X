import { useState } from 'react'
import {Route,Routes,BrowserRouter} from "react-router-dom"
import {Signup} from "./pages/signup"
import {Landing} from "./pages/landing"
import {Dashboard} from "./pages/dashboard"
import { SignIn } from './pages/signin'
import {GamePage} from "./pages/game"


function App() {
  return (
       <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="signup"  element={<Signup/>}></Route>
            <Route path="signin" element={<SignIn/>}></Route>
            <Route path="dashboard" element={<Dashboard/>}></Route>
            <Route path = "/game" element={<GamePage/>}></Route>
          </Routes>
        </BrowserRouter>
       </div>
    
  )
}

export default App
