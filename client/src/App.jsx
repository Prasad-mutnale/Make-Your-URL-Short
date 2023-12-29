import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './assets/Home'
import Signup from './assets/Signup/Signup'
import Signin from './assets/SignIn/Signin'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Home/> */}
     <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/" element={<Signin/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </>
  )
}

export default App
