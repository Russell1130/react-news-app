import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

import { NavLink } from 'react-router-dom';
import { RiAddCircleLine, RiSaveLine } from 'react-icons/ri';
import { FiSearch, FiFile } from 'react-icons/fi';
import { APP_ENDPOINT, KEYWORD_LIST } from '../global/constants';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

function ArticlesPage(props) {

    const { id } = props;
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [keys, setKeys] = useState([]);
    const [flag, setFlag] = useState(false);

    const handleFilterArticles = (key) => {
        const url = `/articles-${key}`;
        window.open(url, '_blank');
    }
    useEffect(() => {
        axios.post(APP_ENDPOINT+'api/articles/get_all')
          .then(res => {
            let t_post = [];
            let k_arr = [];
      
            res.data.forEach(post => {
              if (post.keywords.includes(id)) { // Check if post includes the id in its keywords
                const tmp = (
                  <div className='my-2'>
                    {post.keywords.split(':').map(key => (
                      key != '' ?
                        <div className='p-2 mx-1 bg-violet-300 text-violet-800 font-bold inline-block'>{key}</div> :
                        <></>
                    ))}
                  </div>
                );
      
                k_arr.push(tmp);
                t_post.push(post);
              }
            });
      
            setPosts(t_post);
            setKeys(k_arr);
      
            const user = JSON.parse(localStorage.getItem('user'));
      
            if (user.user.saved_articles == "none" || user.user.saved_articles == "") return;
      
            const s_arr = [];
            user.user.saved_articles.split(' ').map((ind) => {
              console.log(ind);
      
              if (res.data[ind].keywords.includes(id)) s_arr.push(res.data[ind]);
            });
      
            setSavedPosts([...s_arr]);
            console.log(s_arr);
          })
          .catch(err => {
            console.log(err);
          });
      }, []);
      
      const handleSaveArticle = (index) => {
        const object = {
          id: index,
        }
      
        let user = JSON.parse(localStorage.getItem('user'));
        const jwtToken = user.access_token;
        console.log(jwtToken);
      
        axios.post(APP_ENDPOINT + 'api/auth/add_article', object, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        })
        .then((res) => {
          console.log(res);
      
          if (res.data.message == 'Success') {
            if (user.user.saved_articles == "none") user.user.saved_articles = index.toString();
            else user.user.saved_articles += ' ' + index.toString();
      
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Saved Successfully.', { autoClose:1000 });
      
            setTimeout(() => {
              window.location='/articles';
            }, 2000)
          }
          else
          {
            toast.warning('This article has already saved.', { autoClose:1000 });
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }

    const handleShowMode = (mode) => {
        setFlag(mode);
    }
    return (
        <div>
            <Navbar />
            <div className='flex justify-center bg-gray-300'>
                <div className='flex flex-col bg-gray-300 pt-4 px-2' style={{ width: "1280px" }}>
                <div className='text-orange-700 text-xl py-2'>Articles</div>
                <div className='text-gray-600 py-2'>The latest news, resources and thoughts from the world of Javascript</div>
                <div className='inline-block w-auto'>
                    <button onClick={() => handleShowMode(false)} className={`mr-4 p-2 rounded-md ${flag == true ? 'bg-white hover:bg-slate-700' : 'bg-slate-700 text-white'}`}>
                    <div className={'flex'}>
                        <FiFile className='text-2xl' />
                        <div className='mx-4'>All articles</div>
                    </div>
                    </button>
                    <button onClick={() => handleShowMode(true)} className={`mr-4 p-2 rounded-md ${flag == false ? 'bg-white hover:bg-slate-700' : 'bg-slate-700 text-white'}`}>
                    <div className={'flex'}>
                        <RiSaveLine className='text-2xl' />
                        <div className='mx-4'>Saved articles</div>
                    </div>
                    </button>
                    <button className='mr-4 p-2 rounded-md bg-white hover:bg-slate-700 hover:text-white'>
                    <NavLink className={'flex '} to='/article/new'>
                        <RiAddCircleLine className='text-2xl' />
                        <div className='mx-4'>Write an article</div>
                    </NavLink>
                    </button>
                </div>
                <p><br /></p>
                <div className='flex flex-row'>
                    <div className='flex flex-col w-3/4'>
                    <div className='grid gap-4 flex-col'>
                        {(flag == false ? posts : savedPosts).map((post, index) => {
                        return (
                            <div className='flex rounded-md bg-white p-4'>
                            <div className='relative w-2/3'>
                                <div className='my-2 font-bold text-2xl'>{post.title}</div>
                                <div className='my-2'>
                                <span className='text-xl'>{post.author}</span>
                                <span className='text-xl'>{post.created_at}</span>
                                </div>
                                <div className='flex flex-col'>{keys[index]}</div>
                                <RiSaveLine onClick={() => handleSaveArticle(index)} className='absolute cursor-pointer bottom-0 text-3xl' />
                            </div>
                            <div className='grid gap-2 w-1/3 p-4'>
                                <img src={post.image_url} className='place-self-center' style={{ width: "200px", height: "120px" }} />
                                <div className='place-self-center rounded-md text-violet-700 flex-1 cursor-pointer text-center border border-violet-700 py-2' style={{ width: "200px" }}>View Article</div>
                            </div>
                            </div>
                        )
                        })}
                    </div>
                    </div>
                    <div className='flex w-1/4 pl-4'>
                    <div className='bg-white p-4 rounded-md'>
                        <div className='inline-flex flex-wrap'>
                        {KEYWORD_LIST.map((word, index) => (
                            <div onClick={() => handleFilterArticles(word)} className='cursor-pointer flex flex-row items-center px-3 bg-violet-200 hover:bg-violet-300 text-violet-800 font-medium p-1 m-1 rounded-md'>
                            {word}
                        </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ArticlesPage;