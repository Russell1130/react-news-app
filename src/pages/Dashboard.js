import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [loggedIn, setLoggedIn] = useState(user !== null)

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      setLoggedIn(false)
    }
  }, [])

  if (!loggedIn) {
    return <Navigate to="/sign-in" />
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold text-black mt-8 text-center">Welcome, <span className="text-primary">{user.user.first_name}!</span></h1>
      <div className="flex justify-center mt-6">
        <div className="mx-4">
          <Link to="/news" className="text-lg py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200">Show News from JsJobbs</Link>
        </div>
        <div className="mx-4">
          <Link to="/articles" className="text-lg py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all duration-200">Show Articles</Link>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  )
}

export default Dashboard;
