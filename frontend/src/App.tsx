import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"
import Feed from "./Feed"
import Draft from "./Draft"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<Login />}/>
        <Route path="/user/signup" element={<Signup />}/>
        <Route path="/" element={<Feed />}/>
        <Route path="/account/create" element={<Draft />} />
        <Route path="*" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
