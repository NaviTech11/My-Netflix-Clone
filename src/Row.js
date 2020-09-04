import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargerRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

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

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            //https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="posters_container">
            {/* several row--posters */}
            {movies.map(movie => (
                <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row_poster ${isLargerRow && `row_posterLarge`}`}
                src={`${baseUrl}${isLargerRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
            ))}
            </div>
                {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;

