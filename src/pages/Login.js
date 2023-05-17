import React, { useState } from 'react'
import Outernavbar from '../components/OuterNavbar'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { APP_ENDPOINT } from '../global/constants';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(() => {
    const udata = localStorage.getItem('user');
    return udata !== null;
  });

  const onChangeUserEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userObject = {
      email: email,
      password: password
    };

    axios.post(APP_ENDPOINT + 'api/auth/login', userObject)
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      })
      .catch((error) => {
        console.log(error)
        toast.warning("Wrong email or password", {autoClose:1000});
      });

    setEmail('');
    setPassword('');
  }

  if(loggedIn) return <Navigate to="/dashboard" />
  return (
    <div className="App bg-gray-100 min-h-screen">
  <Outernavbar />
  <div className="max-w-md mx-auto mt-10 rounded p-8">
    <h3 className="text-xl font-semibold mb-4">Sign In</h3>
    <p className="forgot-password text-right text-sm mb-4">
      Don't have an account?{' '}
      <a href="/sign-up" className="text-blue-600 font-medium">
        Join us.
      </a>
    </p>
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Email address
        </label>
        <input
          type="email"
          className="form-control border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={onChangeUserEmail}
          name="email"
          value={email}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          className="form-control border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={onChangePassword}
          name="password"
          value={password}
        />
      </div>
      <div className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label
            className="custom-control-label text-gray-700 font-medium"
            htmlFor="customCheck1"
          >
            Remember me
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default Login;
