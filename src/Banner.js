import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from './axios';
import requests from './Requests';

function Banner() {
    const [movie, setMovie] = useState([]);

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results?.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    console.log(movie);

    return (
        <header className="banner" style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.
                backdrop_path}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
        }}>
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.name || movie?.titel || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">PLay</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(`${movie?.overview}`, 125)}
                </h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner;
