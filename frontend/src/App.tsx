import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"
import Feed from "./Feed"
import Draft from "./Draft"
import Page from "./Page"
import Stories from "./Stories"
import Drafts from "./components/Drafts"
import Published from "./components/Published"
import Profile from "./Profile"
import Home from "./components/Home"
import About from "./components/About"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<Login />}/>
        <Route path="/user/signup" element={<Signup />}/>
        <Route path="/account/feed" element={<Feed />}/>
        <Route path="/account/create/:id" element={<Draft />} />
        <Route path="/account/page/:id" element={<Page />} />
        <Route path="/account/stories" element={<Stories />}>
            <Route index element={<Navigate to="draft" replace />}/>
            <Route path="draft" element={<Drafts />}/>
            <Route path="published" element={<Published />}/>
        </Route>
        <Route path="/account/profile" element={<Profile />}>
            <Route index element={<Navigate to="home" replace />}/>
            <Route path="home" element={<Home />}/>
            <Route path="about" element={<About />}/>
        </Route>
        <Route path="/" element={<Navigate to="/user/login" replace />}/>
        <Route path="*" element={<Navigate to="/account/feed" replace />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
