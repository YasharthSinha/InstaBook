import React from 'react'
import { useEffect, useState } from 'react';
import './PreLoader.css'
const Preloader = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`curtain ${isLoaded ? 'open' : 'closed'}`}>
            {/* <img className={`${isLoaded ? 'open' : 'closed'}`} src="https://64.media.tumblr.com/348aa1e187970b1653163582b52d8650/tumblr_pau8vap0IS1s60oo7o1_400.gif" alt="loader"></img> */}
        </div>
    );
}

export default Preloader