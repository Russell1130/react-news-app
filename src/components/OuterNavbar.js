import React from 'react';
import { Link } from 'react-router-dom';

function Outernavbar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-100 shadow-md">
  <div className="container mx-auto py-4 px-6 flex items-center justify-between">
    <Link className="text-gray-800 font-medium text-xl" to="/sign-in">
      Laravel + React Test
    </Link>
    <div>
      <Link className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-5 py-2 mr-4" to="/sign-up">
        Sign up
      </Link>
      <Link className="text-gray-800 font-medium" to="/sign-in">
        Login
      </Link>
    </div>
  </div>
</nav>
  );
}

export default Outernavbar;
