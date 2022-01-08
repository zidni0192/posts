import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router";
import Admin from './container/admin';
import Home from './container/home';
import Login from './container/login';
export default function App() {
  const navigate = useNavigate();

  const checkIsLoggedIn = async () => {
    let user = await localStorage.getItem('user')
    if (user && user !== "") {
      user = JSON.parse(user)
      if (Number(user.isAdmin)) {
        navigate('/admin', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    } else {
      navigate('/login', { replace: true })
    }
  }

  useEffect(() => {
    checkIsLoggedIn('')
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/liked-posts" element={<Admin />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}
