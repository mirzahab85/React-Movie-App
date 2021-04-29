import React from 'react'

const IMG_API = "https://image.tmdb.org/t/p/w500";

const DetailMovie = ({ movie, setDetailMovie }) => {
    return (
        <div>
            <button onClick={() => setDetailMovie(null)}>BACK</button>
            <img src={IMG_API + movie.poster_path} alt={movie.title} />
            <br/>
            Title: <p>{movie.original_title}</p>
            <br/>
            Description: <p>{movie.overview}</p>
        </div>
    )
};

export default DetailMovie;