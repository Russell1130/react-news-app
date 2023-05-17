import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'
import News from './pages/News'
import Articles from './pages/Articles'
import ArticlesPage from './pages/ArticlesPage';
import Blog from './pages/Blog'
import CreateBlog from './pages/CreateBlog'
import Profile from './pages/Profile';
import { KEYWORD_LIST } from './global/constants';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/news" element={<News />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleId" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/new" element={<CreateBlog />} />
          {
            KEYWORD_LIST.map(id => (
              <Route key={id} path={`/articles-${id}`} element={<ArticlesPage id={id}/>} />
            ))
          }
          <Route path="/articles-REMOTE%20WORKING" element={<ArticlesPage id={"REMOTE WORKING"} />}/>
          <Route path="/articles-FLEXIBLE%20WORKING" element={<ArticlesPage id={"FLEXIBLE WORKING"} />}/>
          <Route path="/articles-C" element={<ArticlesPage id={"C#"} />}/>
          <Route path="/articles-F" element={<ArticlesPage id={"F#"} />}/>
        </Routes>
      </div>
    </Router>
  )
}
export default App