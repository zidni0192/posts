import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from "react-router";
import Admin from './container/admin';
import Create from './container/admin/create';
import Edit from './container/admin/edit';
import View from './container/admin/view';
import Home from './container/home';
import Liked from './container/liked';
import Login from './container/login';
import { getLiked } from './redux/reducers/post'
import { getUser } from './redux/reducers/user';
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.data)

  const fetchUser = () => {
    if (!user || !user.id) {
      dispatch(getUser())
    }
    checkIsLoggedIn()
  }
  const checkIsLoggedIn = async () => {
    if (user && user.id) {
      dispatch(getLiked())
      if (location.pathname === "/login") {
        if (Number(user.isAdmin)) {
          navigate('/admin', { replace: true })
        } else {
          navigate('/', { replace: true })
        }
      }
    } else {
      navigate('/login', { replace: true })
    }
  }


  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    checkIsLoggedIn()
  }, [user])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/liked-posts" element={<Liked />} />
      <Route path="/admin"  >
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<Create />} />
        <Route path="/admin/posts" >
          <Route path="/admin/posts/:id">
            <Route path="/admin/posts/:id" element={<View />} />
            <Route path="/admin/posts/:id/edit" element={<Edit />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
