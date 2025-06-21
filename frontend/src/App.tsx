import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"
import Feed from "./Feed"
import Draft from "./Draft"
import Page from "./Page"
import Stories from "./Stories"
import Drafts from "./components/Drafts"
import Published from "./components/Published"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<Login />}/>
        <Route path="/user/signup" element={<Signup />}/>
        <Route path="/" element={<Feed />}/>
        <Route path="/account/create" element={<Draft />} />
        <Route path="/account/page/:id" element={<Page />} />
        <Route path="/account/stories" element={<Stories />}>
            <Route index element={<Navigate to="draft" replace />}/>
            <Route path="draft" element={<Drafts />}/>
            <Route path="published" element={<Published />}/>
        </Route>
        <Route path="*" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
