import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { APP_ENDPOINT } from "../global/constants";
import { RiArrowGoBackFill } from "react-icons/ri";

const Blog = (props) => {

    const param = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        const fetchArticle = async () => {
            console.log(param.articleId);
            const formData = new FormData();
            formData.append('title', param.articleId);
    
            try {
                const response = await axios.post(APP_ENDPOINT+'api/articles/get_by_title', formData);
                setArticle(response.data);
            } catch (error) {
                console.log(error);
                try {
                    const tform = new FormData();
                    tform.append('title', param.articleId+'?');

                    const response = await axios.post(APP_ENDPOINT+'api/articles/get_by_title', tform);
                    setArticle(response.data);
                } catch (error) {

                }
            }
        };
    
        fetchArticle();
        console.log(article);
        
    }, []);

    return (
        <div>
            <Navbar />
            <NavLink to="/articles">
                <RiArrowGoBackFill className="absolute m-6 text-2xl hover:text-blue-500 cursor-pointer"/>
            </NavLink>
            <div className="flex flex-col items-center pt-20 px-10">
                <div className="text-xl font-bold mb-4">{article.title}</div>
                <div className="mb-2">
                            {
                              article.body && article.body.split('\n').map((line, index) => (
                                <div key={index}>{line}<br/></div>
                              ))
                            }
                          </div>
                <div className="mb-2">
                    <div className="flex">
                        { article.keywords && article.keywords.split(':')
                            .filter(tg => tg) // Filter out any falsy values in the array
                            .map((tg, ind) => (
                                <div key={ind} className='bg-blue-300 rounded-2xl px-4 py-1 m-2 text-center'>{tg}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Blog;