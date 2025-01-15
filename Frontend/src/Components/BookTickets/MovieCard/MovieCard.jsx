import React, { useRef } from 'react';
import './MovieCard.css';
import mov1 from "../../../images/mov_card1.jpg"
import watchgif from "../../../images/watching-movie.gif";
import { Link } from 'react-router-dom';
const MovieCard = () => {
    const containerRef = useRef(null);

    // Array of movie data (titles and image URLs)
    const movies = [
        {
            id:1,
            title: 'Singham Again',
            imageUrl: mov1,
        },
        {
            id:2,
            title: 'Bhool Bhuliyaa 3',
            imageUrl: mov1,
        },
        {
            id:3,
            title: 'Singham Again',
            imageUrl: mov1,
        },
        {
            id:4,
            title: 'Singham Again',
            imageUrl: mov1,
        },
        {
            id:5,
            title: 'Singham Again',
            imageUrl: mov1,
        },
    ];

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -370, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 370, behavior: 'smooth' });
        }
    };

    return (
        <div className="movie-card-wrapper">
            <h1 className='justify-center ml-4 headmain'>Currently showing</h1>
            <button className="nav-arrow left" onClick={scrollLeft}>
                &#8592;
            </button>

            <div className="movie-card-list" ref={containerRef}>
                {movies.map((movie, index) => (
                    <div className="maindiv" key={index}>
                        <div className="container">
                            <div
                                className="banner-image"
                                style={{ backgroundImage: `url(${movie.imageUrl})` }}
                            ></div>
                            <h1 className='head'>{movie.title}</h1>
                            <div className="button-wrapper">
                            <Link 
                                to={`/movie`}
                                state={{ id: movie.id, name: movie.title }}
                            > <button type="button" class="btn">
                                    <strong>Book Now</strong>
                                    <div id="container-stars">
                                        <div id="stars"></div>
                                    </div>

                                    <div id="glow">
                                        <div class="circle"></div>
                                        <div class="circle"></div>
                                    </div>
                                </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>  
            <button className="nav-arrow right" onClick={scrollRight}>
                &#8594;
            </button>
        </div>
    );
};

export default MovieCard;
