import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn } from 'react-icons/md';
import { BsDot } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';

const month_code = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function News() {

    const [news, setNews] = useState([]);
    const [personalNews, setPersonalNews] = useState([]);
    const [colors, setColors] = useState([]);
    const [dates, setDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [clickedIndex, setClickedIndex] = useState(-1);
    const [filtered, setFiltered] = useState(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [loggedIn, setLoggedIn] = useState(user !== null)


    useEffect(() => {

      if (localStorage.getItem('user') === null) {
        setLoggedIn(false)
      }

        const fetchArticles = async () => {
          setIsLoading(true);

          const t_col = [];
          const t_dat = [];
          const response = await axios.get(
            "https://jsjobbs.com/api/v1/jobs"
          );
          setNews(response.data.jobs);
          console.log(response.data.jobs);

          //const user = JSON.parse(localStorage.getItem('user'));
          let t_pnews = [];
          let cnt = 0;

          const feed = user.user.news_feed.toLowerCase().split(', ');

          for (let i = 0 ; i < response.data.jobs.length ; i ++) {

            let matchFound = false;

            for (let j = 0 ; j < response.data.jobs[i].tags.length ; j ++ ) {

              const tag = response.data.jobs[i].tags[j].toLowerCase();

              feed.forEach(element => {
                if(tag.includes(element) && !matchFound) {
                  t_pnews[cnt++] = response.data.jobs[i];
                  matchFound = true;
                }
              });
            }

            const timestamp = response.data.jobs[i].datePublished;
            t_col[i] = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}) `;
            const tmp = new Date(timestamp);
            t_dat[i] = month_code[tmp.getMonth()] + ' ' + tmp.getDate().toString();
          }
          setColors(t_col);
          setDates(t_dat);
          setPersonalNews(t_pnews);

          setIsLoading(false);
          console.log(t_pnews);
        };
        fetchArticles();
        
      }, []);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await axios.get(
              "https://jsjobbs.com/api/v1/jobs"
            );
            setNews(response.data.jobs);
          };
          fetchArticles();
    }, news);

    if (!loggedIn) {
      return <Navigate to="/sign-in" />
    }
  
    const handleNewsClicked = (index) => {
      if(index == clickedIndex) setClickedIndex(-1);
      else setClickedIndex(index);
    }

    const handleFilter = () => {
      setFiltered(!filtered);
    }

    return (
        <div className=''>
            <Navbar></Navbar>
            {isLoading ? (
              <div className='flex justify-center items-center h-screen'>
                <div
                className="inline-block self-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute text-blue-700 !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span>
              </div>
            </div>
            ) : (
              <div class="flex flex-col md:max-w-1000 px-2 md:px-10">
                <div className='flex flex-row bg-blue-800 px-4 py-2 w-1/3 cursor-pointer justify-center text-white rounded-md my-6' onClick={handleFilter}>
                  <span>{filtered ? "Show All News" : "Personalized news feed by Category."}</span>
                  <br/>
                  {filtered ? <FaTimes className='self-center text-xl' onClick={handleFilter}/> : <></>}
                </div>
              <div className='grid gap-4'>
                {(filtered ? personalNews : news).map((item, index) => (
                  <div>
                    <div onClick={() => handleNewsClicked(index)} className='cursor-pointer flex flex-row bg-white border rounded-xl p-6'>
                      <div className="hidden md:block relative w-1/6">
                        <div className="border text-center border-gray-400 rounded-md bg-white px-6 py-4 relative z-20 text-7xl"
                        style={{color: colors[index]}}>{item.companyName[0]}</div>
                        <div className="h-[120px] absolute -inset-1 rounded-xl blur-sm bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500 z-10"></div>
                      </div>
                      <div className='ml-4 w-3/4 flex flex-col'>
                        <div className='font-bold text-xl'>{item.title}</div>
                        <div>{item.companyName = item.companyName.charAt(0).toUpperCase() + item.companyName.slice(1)}</div>
                        <div className='flex flex-row'>
                          <MdLocationOn className='text-red-700'/>
                          {item.countryName }
                          <BsDot />
                          {item.remoteLocations[0]=='Anywhere'
                          ? <div className='text-md'>Remote Worldwide</div>
                            : <div>Remote in {item.remoteLocations.length} Location</div>
                            }
                        </div>
                        <div className='grid grid-cols-3'>
                        {
                          item.tags.map((tg, ind) => (
                            <div className='bg-blue-300 rounded-2xl px-4 py-1 m-2 text-center'>{tg}</div>
                          ))
                        }
                      </div>
                      </div>
                      <div className='ml-auto flex-shrink-0'>{dates[index]}</div>
                    </div>
                    {
                      index == clickedIndex ?
                        <div>
                          <div className='self-center text-xl'>{item.companyName}</div>
                          <br/>
                          <div className='self-center text-3xl font-bold'>{item.title}</div>
                          <br/>
                          <div className='flex flex-row self-center'>
                            {
                              item.tags.map((tg, ind) => (
                                <div className='bg-blue-300 rounded-2xl px-4 py-1 mx-2'>{tg}</div>
                              ))
                            }
                          </div>
                          <br/><br/>
                          <div>Date Posted : {dates[index]}</div>
                          <div>Job Type : {item.jobType}</div>
                          <div>Work Type : {item.workplaceType == 10 ? "Remote" : "Hybrid"}</div>
                          <div>Job Level : {item.jobLevel}</div>
                          <div>Job Location : {item.state + " " + item.countryName}</div>
                          <div>Accepting Applications From : {item.remoteLocations.map((loc, ind) => (<span>{loc}</span>))}</div>
                          <br/><br/>
                          <div className='text-2xl font-bold'>Job Description</div>
                          <br/><br/>
                          <div>
                            {
                              item.description.split('\n').map((line, index) => (
                                <div key={index}>{line}<br/></div>
                              ))
                            }
                          </div>
                          <br/><br/>
                          <div className='text-center px-3 py-1 bg-blue-800 cursor-pointer w-1/3 rounded-md text-white'>
                            <a href={item.link} target='_blank'>Go to Job Site</a>
                          </div>
                        </div>
                        : <></>
                    }
                  </div>
                ))}
              </div>
            </div>
            )}
            
        </div>
    );
}

export default News;