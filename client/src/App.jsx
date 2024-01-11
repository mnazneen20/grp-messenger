import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Private from "./components/Private"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Private><Home /></Private>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
