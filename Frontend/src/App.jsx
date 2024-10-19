import { Routes, Route } from "react-router-dom";
import usercontext from "./context/user_context";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import { useState } from "react";
function App() {
const [user, setuser] = useState(false)

  return (
    <>
    <usercontext.Provider value={{user,setuser}}>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/"element={user ? <Home /> : <Login />} />
      </Routes>
      </usercontext.Provider>
    </>
  )
}

export default App