import React, { Component, useState } from 'react';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';

function Navbar() {
  const location = useLocation();
  const [vis, setVis] = useState(false);

  const handleMenu = () => {
    setVis(!vis);
  }

  return (
    <div>
      <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 md:flex-wrap md:justify-start md:py-4" data-te-navbar-ref>
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 md:hidden"
            type="button"
            onClick={handleMenu}
          >
            <span className="[&>svg]:w-7">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>
          
          <div
            className="!visible hidden flex-grow basis-[100%] items-center md:!flex md:basis-auto"
            id="navbarSupportedContent1"
            data-te-collapse-item
          >
            <a
              className="mb-4 mr-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 md:mb-0 md:mt-0"
              href="#"
            >
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                style={{ height: "15px" }}
                alt=""
                loading="lazy"
              />
            </a>

            <ul
              className="list-style-none mr-auto flex flex-col pl-0 md:flex-row"
              data-te-navbar-nav-ref
              
            >
              <li className="mb-4 md:mb-0 md:pr-2" data-te-nav-item-ref>
                <NavLink
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 md:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  to="/dashboard"
                  data-te-nav-link-ref
                >
                  <span className={`${location.pathname=='/dashboard' ? 'font-bold' : 'font-normal'}`}>Home</span>
                </NavLink>
              </li>

              <li className="mb-4 md:mb-0 md:pr-2" data-te-nav-item-ref>
                <NavLink
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 md:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  to="/news"
                  data-te-nav-link-ref
                >
                  <span className={`${location.pathname=='/news' ? 'font-bold' : 'font-normal'}`}>News</span>
                </NavLink>
              </li>

              <li className="mb-4 md:mb-0 md:pr-2" data-te-nav-item-ref>
                <NavLink
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 md:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  to="/articles"
                  data-te-nav-link-ref
                >
                  <span className={`${location.pathname=='/articles' ? 'font-bold' : 'font-normal'}`}>Articles</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className='ml-auto self-center flex'>
            <Dropdown />
          </div>
        </div>
        
      </nav>
      <div className={`${vis ? 'flex flex-col' : 'hidden'} md:hidden p-4`} style={{fontSize:"14px"}}>
        <NavLink
          className="p-2 text-neutral-500 hover:bg-neutral-700 hover:text-white focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 md:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          to="/dashboard"
          data-te-nav-link-ref
        >
          <span className={`${location.pathname=='/dashboard' ? 'font-bold' : 'font-normal'}`}>Home</span>
        </NavLink>
        <NavLink
          className="p-2 text-neutral-500 hover:bg-neutral-700 hover:text-white focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 md:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          to="/news"
          data-te-nav-link-ref
        >
          <span className={`${location.pathname=='/news' ? 'font-bold' : 'font-normal'}`}>News</span>
        </NavLink>
        <NavLink
          className="p-2 text-neutral-500 hover:bg-neutral-700 hover:text-white focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 md:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          to="/articles"
          data-te-nav-link-ref
        >
          <span className={`${location.pathname=='/articles' ? 'font-bold' : 'font-normal'}`}>Articles</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
