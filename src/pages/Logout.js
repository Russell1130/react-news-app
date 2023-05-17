import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {

    useEffect(() => {
      localStorage.removeItem("user")
    }, [])

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">You have been logged out</h1>
        <Link
          to="/sign-in"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Login again
        </Link>
      </div>
    );
}

export default Logout;