import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./row.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargerRow}) {
    const [movies, setMovies] = useState([]);

    //A snippet of code that runs based on specific condition/variable
    useEffect(() => {
        //if, it means run once when row loads and don't load again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    console.log(movies);

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="posters_container">
            {/* several row--posters */}
            {movies.map(movie => (
                <img
                key={movie.id}
                className={`row_poster ${isLargerRow && `row_posterLarge`}`}
                src={`${baseUrl}${isLargerRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
            ))}
            </div>

        </div>
    )
}

export default Row;

