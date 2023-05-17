import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
    const [user, setUser] = useState({});
    const [feed, setFeed] = useState('');

    useEffect(() => {
        let tmp = JSON.parse(localStorage.getItem('user'));
        setUser(tmp.user);
        setFeed(tmp.user.news_feed);
    }, [])
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center pt-20">
                <div className="text-xl font-bold mb-4">User Information:</div>
                <div className="mb-2"><span className="font-bold">First Name:</span> {user.first_name}</div>
                <div className="mb-2"><span className="font-bold">Last Name:</span> {user.last_name}</div>
                <div className="mb-2"><span className="font-bold">Email Address:</span> {user.email}</div>
                <div className="mb-2"><span className="font-bold">Phone Number:</span> {user.phone}</div>
                <div className="mb-2">
                    <span className="font-bold">Preferred News Sources:</span>
                    <div className="flex flex-wrap mt-2">
                    {feed.split(', ').map((item, index) => (
                        <div className="bg-blue-300 rounded-full px-4 py-1 mr-2 mb-2 text-sm">{item}</div>
                    ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;