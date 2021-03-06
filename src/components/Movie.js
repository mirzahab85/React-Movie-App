import React from 'react'


const setVoteClass = (vote) => {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 6) {
        return "orange";
    } else {
        return "red";
    }
};

const IMG_API = "https://image.tmdb.org/t/p/w500";
const Movie = ({movie, title, details, poster_path, overview, vote_average, setDetailMovie}) => (
    <div className="movie" onClick={() => setDetailMovie(movie)}>
        <img src={IMG_API + poster_path} alt={title} />
        <div className="movie-info">
        <h3>{title}</h3>
        
     
        <span className={
            `tag ${setVoteClass(vote_average)}`
            }>
            {vote_average}
        </span>
    </div>
        
    <div className="movie-over">
        <h2>overview</h2>
        <p>{overview}</p>
    </div>
    </div>
);

export default Movie;