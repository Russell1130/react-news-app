import React, { useState } from 'react';
import Outernavbar from '../components/OuterNavbar';
import axios from 'axios';
import { APP_ENDPOINT } from '../global/constants';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    news_feed: '',
  });

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [loggedIn, setLoggedIn] = useState(user !== null)

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userData.first_name.length < 2 || userData.first_name.length > 20) {
      toast.warning('First-name should be between 2-20 characters', {autoClose:1000});
      return;
    }

    if (userData.last_name.length < 2 || userData.last_name.length > 20) {
      toast.warning('Last-name should be between 2-20 characters', {autoClose:1000});
      return;
    }

    if (userData.phone.length < 5 || userData.phone.length > 12) {
      toast.warning('Phone number should be between 5-12 digits', {autoClose:1000});
      return;
    }

    if (userData.password.length < 6) {
      toast.warning('Password should be greater then 5 characters', {autoClose:1000});
      return;
    }

    if (userData.password !== userData.password_confirmation) {
      toast.warning('Enter same password in both fields', {autoClose:1000});
      return;
    }

    if (userData.news_feed === '') {
      toast.warning('Input News Feed', {autoClose:1000});
      return;
    }

    const userObject = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
      saved_articles: 'none',
      news_feed: userData.news_feed,
    };

    axios
      .post(APP_ENDPOINT + 'api/auth/register', userObject)
      .then((res) => {
        if (res.data.message === 'User successfully registered') {
          toast.success('Registration Successful', {autoClose:1000});
          window.location = '/sign-in';
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.data ===
          '{"email":["The email has already been taken."]}'
        ) {
          setErrorMessage('The email has already been taken.');
        }
      });

    setUserData({
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
      password_confirmation: '',
      news_feed: '',
    });
  };

  if(loggedIn) return <Navigate to="/dashboard" />

  return (
    <div className="App bg-gray-100 min-h-screen">
      <Outernavbar />
      <div className="max-w-md mx-auto mt-10 rounded p-8">
        <div className="rounded-lg px-6 py-12">
          <form style={{height:"420px"}}>
            <h3 className="text-2xl font-bold mb-4">Sign Up</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  First name
                </label>
                <input
                  type="text"
                  className="form-input block w-full border border-gray-400 p-2 rounded-lg"
                  placeholder="First name"
                  onChange={handleChange}
                  name="first_name"
                  value={userData.first_name}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-input block w-full border border-gray-400 p-2 rounded-lg"
                  placeholder="Last name"
                  onChange={handleChange}
                  name="last_name"
                  value={userData.last_name}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-input block w-full border border-gray-400 p-2 rounded-lg"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  name="phone"
                  value={userData.phone}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-input block w-full border border-gray-400 p-2 rounded-lg"
                  placeholder="Enter email"
                  onChange={handleChange}
                  name="email"
                  value={userData.email}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  className="form-input block w-full border border-gray-400 p-2 rounded-lg"
                  placeholder="Enter password"
                  onChange={handleChange}
                  name="password"
                  value={userData.password}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-input block w-full border border-gray-400 p-2 rounded-lg"
                  placeholder="Enter password"
                  onChange={handleChange}
                  name="password_confirmation"
                  value={userData.password_confirmation}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Input News Feed
                </label>
                <input
                  type="text"
                  className="form-input block w-full border border-gray-400 p-2 rounded-lg"
                  placeholder="news feed"
                  onChange={handleChange}
                  name="news_feed"
                  value={userData.news_feed}
                />
              </div>
            </div>
          </form>

          <div className="flex mt-6">
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Sign Up
            </button>
            <p className="mx-4 forgot-password">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
