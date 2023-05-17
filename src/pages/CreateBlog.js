import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ImgUploader from '../components/ImgUploader';
import { KEYWORD_LIST } from '../global/constants';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { APP_ENDPOINT } from '../global/constants';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {

    const [keywords, setKeyWords] = useState([]);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageUpload = (img) => {
        setImage(img);
    }

    const AddArticle = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const author = user.user.first_name + ' ' + user.user.last_name;
        const title = document.querySelector('input[type="text"]').value;
        const body = document.querySelector('textarea').value;
        let words = '';
        for ( let i = 0 ; i < KEYWORD_LIST.length; i ++) {
            if(keywords[i] == true) words = words + KEYWORD_LIST[i] + ':';
        }
        if(image == null || title == '' || body == '' || words == '') {
            console.log('input error');
            toast.error('Input Error!', { autoClose:1000});
            return;
        }
        console.log('----------');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('image', image);
        formData.append('keywords', words);
        formData.append('author', author);

        axios.post(APP_ENDPOINT+'api/articles/insert', formData)
        .then(res => {
            toast.success('Success', {autoClose:500});
            setTimeout(() => {
                navigate('/articles');
            }, 1000);
        })
        .catch(err => {
            console.log(err);
            if(err.response.status == 400) {
                toast.error('The Title has already been taken.', {autoClose:500})
            }
        });
    }

    useEffect(() => {
        const tmp = [];
        for (let i = 0; i < KEYWORD_LIST.length; i ++) tmp[i]=false;
        setKeyWords([...tmp]);
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className='text-orange-700 text-xl px-20'>Create Article</div>
            <div className='flex'>
                <div className='flex flex-col px-20'>
                    <ImgUploader onUpload={handleImageUpload}/>
                    <div>*Title</div>
                    <input type='text' className='border-2 p-2 my-4'/>
                    <div>*Body of article</div>
                    <textarea className='border-2 h-60 p-2 overflow-y-scroll'></textarea>
                    <div>*Type to search</div>
                    <div className='flex flex-wrap'>
                        {KEYWORD_LIST.map((word, index) => (
                            keywords[index] ? (
                            <div
                                className='cursor-pointer flex flex-row items-center px-3 bg-orange-200 text-orange-800 p-1 m-1'
                                onClick={() => {
                                const tmp = [...keywords];
                                tmp[index] = !tmp[index];
                                setKeyWords([...tmp]);
                                }}
                            >
                                {word}&nbsp;&nbsp;
                                <FaTimes />
                            </div>
                            ) : null
                        ))}
                        {/* Show this message if all keywords are false */}
                        {keywords.every((kw) => !kw) && (
                            <div className='text-gray-500 mx-auto'>No keywords selected.</div>
                        )}
                    </div>

                    <div className='flex flex-wrap'>
                    {
                        KEYWORD_LIST.map((word, index) => (keywords[index]==false?
                            <div className='cursor-pointer bg-orange-100 text-orange-800 p-1 m-1 opacity-40' onClick={() => {
                                const tmp = [...keywords];
                                tmp[index] = !tmp[index];
                                setKeyWords([...tmp]);
                            }}>
                                {word}
                            </div>:<></>
                        ))
                    }
                    </div>
                    <div className='cursor-pointer text-white bg-orange-400 ml-auto py-2 px-6 rounded-md' onClick={AddArticle}>Submit Article</div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default CreateBlog;