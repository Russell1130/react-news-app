import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2">
            <a href="https://github.com/Russell1130" className="text-gray-400 hover:text-gray-300 ml-6">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12C0 17.54 3.438 22.729 8.205 23.852C8.805 23.947 9.005 23.609 9.005 23.313C9.005 23.028 9.001 22.183 9.001 21.118C6.187 21.749 5.626 19.813 5.626 19.813C5.25 18.688 4.563 18.344 4.563 18.344C3.781 17.78 4.625 17.793 4.625 17.793C5.5 17.902 6.094 18.719 6.094 18.719C6.875 20.063 8.188 19.609 9.025 19.281C9.138 18.422 9.375 17.938 9.625 17.656C7.125 17.344 4.313 16.406 4.313 11.719C4.313 10.375 4.781 9.219 5.5 8.313C5.375 7.969 4.906 6.688 5.5 5.063C5.5 5.063 6.453 4.688 9.001 6.219C9.938 5.938 10.969 5.813 12 5.813C13.031 5.813 14.063 5.938 15 6.219C17.563 4.688 18.516 5.063 18.516 5.063C19.109 6.688 18.625 7.969 18.5 8.313C19.219 9.219 19.688 10.375 19.688 11.719C19.688 16.438 16.875 17.344 14.375 17.656C14.813 18.219 15 19.469 15 20.563C15 22.063 15 23.344 15 23.813C15 23.969 15 24.469 15.625 23.938C20.563 22.729 24 17.54 24 12C24 5.37 18.627 0 12 0Z"
                />
              </svg>
            </a>
  
            <a href=" https://www.linkedin.com/in/russell-masato-165377271/" className="text-gray-400 hover:text-gray-300 ml-6">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path 
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.193,20.193h-3.34v-5.214c0-1.247-.025-2.845-1.734-2.845-1.735,0-2,1.355-2,2.756v5.303H9.021V9H12.1v1.469h.036a2.946,2.946,0,0,1,2.667-1.469c2.831,0,3.354,1.866,3.354,4.291v5.9ZM5.808,8.394A1.558,1.558,0,1,1,7.366,6.836,1.556,1.556,0,0,1,5.808,8.394ZM3.726,20.193H6.865V9H3.726Z" fill="#0077B5"
                />
              </svg>
            </a>
          </div>
  
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-gray-400">&copy; 2023 Russell Masato. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
