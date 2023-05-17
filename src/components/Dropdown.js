import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineAccountCircle } from 'react-icons/md';

const Dropdown = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({});

  const handleAccount = () => {
    setVisible(!visible);
  }

  const handleClickOutside = (event) => {
    if(!event.target.innerHTML.startsWith('<path')) {
      setVisible(false);
    }
  }

  useEffect(() => {
    let tmp = JSON.parse(localStorage.getItem('user'));
    setUser(tmp.user);

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <MdOutlineAccountCircle onClick={handleAccount} className='text-4xl text-black cursor-pointer'/>
      <div className={`absolute right-3 z-10 dropdown ${visible == false ? "hidden" : ""} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.first_name + " " + user.last_name}</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
          <div className="py-2">
            <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</NavLink>
          </div>
          <div className="py-2">
            <NavLink to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</NavLink>
          </div>
      </div>
    </div>
  );
};

export default Dropdown;