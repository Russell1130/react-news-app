import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

import { NavLink, Navigate } from 'react-router-dom';
import { RiAddCircleLine, RiSaveLine } from 'react-icons/ri';
import { FiSearch, FiFile } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { APP_ENDPOINT, KEYWORD_LIST } from '../global/constants';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

function Articles() {

    const [posts, setPosts] = useState([]);
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [keys, setKeys] = useState([]);
    const [flag, setFlag] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searched, setSearched] = useState(false);
    const [filtered, setFiltered] = useState(false);
    const [filterDate, setFilterDate] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterAuthor, setFilterAuthor] = useState('');

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [loggedIn, setLoggedIn] = useState(user !== null)

    const handleFilterArticles = (key) => {
        const url = `/articles-${key}`;
        window.open(url, '_blank');
    }
    useEffect(() => {

        if (localStorage.getItem('user') === null) {
            setLoggedIn(false)
          }

        axios.post(APP_ENDPOINT+'api/articles/get_all')
        .then(res => {
            setPosts(res.data);
            let k_arr = [];
            res.data.map(post => {
                let tmp = (
                    <div className='my-2 grid grid-cols-3 gap-1'>
                      {post.keywords.split(':').map(key => (
                        key != '' ?
                        <div onClick={() => handleFilterArticles(key)} className='place-self-center cursor-pointer bg-blue-300 rounded-2xl px-4 py-1 mx-2 inline-block'>{key}</div>
                        : key
                      ))}
                    </div>
                  );
                k_arr.push(tmp);
            });
            setKeys(k_arr);

            const user = JSON.parse(localStorage.getItem('user'));
            if(user.user.saved_articles == "none" || user.user.saved_articles=="") return;
            const s_arr = [];
            user.user.saved_articles.split(' ').map((ind) => {
                console.log(ind);
                s_arr.push(res.data[ind]);
            });
            setSavedPosts([...s_arr]);
            console.log(s_arr);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    if (!loggedIn) {
        return <Navigate to="/sign-in" />
      }
    
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
                if(res.data.message == 'Success') {
                    
                    if(user.user.saved_articles == "none") user.user.saved_articles = index.toString();
                    else user.user.saved_articles += ' ' + index.toString();
                    localStorage.setItem('user', JSON.stringify(user));
                    toast.success('Saved Successfully.', { autoClose:1000 });
                    setTimeout(() => {
                        window.location='/articles';
                    }, 2000)
                    
                }
                else {
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

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
        if(event.target.value == "") setSearched(false);
    }

    const handleAuthorChange = (event) => {
        setFilterAuthor(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setFilterCategory(event.target.value);
    }

    const handleDateChange = (event) => {
        setFilterDate(event.target.value);
    }

    const handleSearch = () => {
        if(searched == true){
            setSearchText('');
            setSearched(false);
            window.location.href="/articles";
        } else {
            setSearched(true);
            let tmp = [];
            for (let i = 0 ; i < posts.length ; i ++)
                if(posts[i].title.toLowerCase().includes(searchText.toLowerCase())) tmp.push(posts[i]);
            setSearchedPosts([...tmp]);
        }
    }

    const handleFilter = () => {
        const tmp = (searched ? searchedPosts : posts);
        setFiltered(true);

        const filteredTmp = tmp.filter(post =>
            post.created_at.includes(filterDate) && 
            post.keywords.toLowerCase().includes(filterCategory) &&
            post.author.toLowerCase().includes(filterAuthor.toLowerCase())
        );

        setFilteredPosts(filteredTmp);
    }
    
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex justify-center bg-gray-300'>
                <div className='flex flex-col bg-gray-300 pt-4 px-2' style={{width:"1280px"}}>
                    <div className='text-red-800 font-bold text-3xl py-2'>Articles</div>
                    <div className='text-gray-600 py-2'>The latest news, resources and thoughts from the world of Javascript</div>
                    <div className='inline-flex'>
                        <button onClick={() => handleShowMode(false)} className={`mr-4 p-2 rounded-md ${flag == true ? 'bg-purple-500 hover:bg-purple-700' : 'bg-green-500 text-white hover:bg-green-700'} focus:outline-none`}>
                            <div className={'flex items-center'}>
                                <FiFile className='text-2xl text-gray-800'/>
                                <div className='mx-4 text-gray-800'>All articles</div>
                            </div>
                        </button>
                        <button onClick={() => handleShowMode(true)} className={`mr-4 p-2 rounded-md ${flag == false ? 'bg-purple-500 hover:bg-purple-700' : 'bg-green-500 text-white hover:bg-green-700'} focus:outline-none`}>
                            <div className={'flex items-center'}>
                                <RiSaveLine className='text-2xl text-gray-800'/>
                                <div className='mx-4 text-gray-800'>Saved articles</div>
                            </div>
                        </button>
                        <button className='mr-4 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none'>
                            <NavLink className={'flex items-center '} to='/article/new'>
                                <RiAddCircleLine className='text-2xl'/>
                                <div className='mx-4'>Write an article</div>
                            </NavLink>
                        </button>
                    </div>

                    <div className='flex flex-col md:flex-row'>
                        <div className='flex flex-col w-full md:w-3/4'>
                            {flag == false ?
                            <div>
                                <div className='my-4 relative flex items-center'>
                                    <input
                                        type="text"
                                        contentEditable
                                        className='rounded-md flex-grow px-4 py-2 focus:outline-none'
                                        placeholder="Search articles..."
                                        value={searchText}
                                        onChange={handleInputChange}
                                    />
                                    {!searched ? 
                                        <FiSearch
                                            onClick={handleSearch}
                                            className='absolute cursor-pointer text-2xl right-1'
                                            value={searchText}
                                            onChange={handleInputChange}
                                        /> : <FaTimes
                                                onClick={handleSearch}
                                                className='absolute cursor-pointer text-2xl right-1'
                                                value={searchText}
                                                onChange={handleInputChange}
                                            />
                                        }
                                </div>
                                <div className='grid grid-cols-4 gap-8'>
                                    <input
                                        type="date"
                                        contentEditable
                                        className='rounded-md flex-grow px-4 py-2 focus:outline-none border-gray-300 border'
                                        placeholder="Filter by date"
                                        value={filterDate}
                                        onChange={handleDateChange}
                                    />
                                    <input
                                        type="text"
                                        contentEditable
                                        className='rounded-md flex-grow px-4 py-2 focus:outline-none border-gray-300 border'
                                        placeholder="Filter by category"
                                        value={filterCategory}
                                        onChange={handleCategoryChange}
                                    />
                                    <input
                                        type="text"
                                        contentEditable
                                        className='rounded-md flex-grow px-4 py-2 focus:outline-none border-gray-300 border'
                                        placeholder="Filter by author"
                                        value={filterAuthor}
                                        onChange={handleAuthorChange}
                                    />
                                    <button onClick={handleFilter} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Filter</button>
                                </div>
                                <br/>
                            </div>
                            :
                             <p><br/></p>
                            }
                            <div className='grid gap-4 flex-col'>
                                {
                                    (flag == false ? (searched ? (filtered ? filteredPosts : searchedPosts) : (filtered ? filteredPosts : posts)) : savedPosts).map((post, index) => {
                                        return (
                                            <div className='flex rounded-md bg-white p-4'>
                                                <div className='relative w-2/3'>
                                                    <div className='my-2 font-bold text-2xl'>{post.title}</div>
                                                    <div className='my-2'>
                                                        <span className='text-xl'>{post.author}</span>
                                                        <span className='text-xl float-right'>{post.created_at.split('T')[0]}</span>
                                                    </div>
                                                    <br/>
                                                    <div className='text-center'>{keys[post.id-1]}</div>
                                                    <RiSaveLine onClick={() => handleSaveArticle(index)} className='absolute cursor-pointer bottom-0 text-3xl'/>
                                                </div>
                                                <div className='grid gap-2 w-1/3 p-4'>
                                                    {/* <img src={post.image_url} className='place-self-center' style={{width:"200px", height: "120px"}}/> */}
                                                    <NavLink
                                                        className='place-self-center rounded-md text-violet-700 flex-1 cursor-pointer text-center border border-violet-700 py-2'
                                                        style={{width:"200px"}}
                                                        to={"/articles/" + post.title}
                                                    >
                                                        View Article
                                                    </NavLink>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex w-full md:w-1/4 pl-4 my-4'>
                            <div className='bg-white p-4 rounded-md'>
                                <div className='inline-flex flex-wrap'>
                                    {
                                        KEYWORD_LIST.map((word, index) => (
                                            <div onClick={() => handleFilterArticles(word)} className='rounded-md cursor-pointer flex flex-row items-center px-3 bg-blue-300 p-1 m-1'>
                                                {word}
                                            </div>
                                        ))
                                    }
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

export default Articles;