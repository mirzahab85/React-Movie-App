import './App.css';

import Movie from "./components/Movie";

import React, { useEffect, useState } from "react";

const FEATURED_API ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2ae13bacb05742feb24cddf8e6d72335&page=1";

const IMG_API = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=2ae13bacb05742feb24cddf8e6d72335&query="

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {   
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
       setMovies(data.results);
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

  if(searchTerm.length > 2) {
        getMovies(SEARCH_API + searchTerm);

        setSearchTerm("");
    }
  };

  const handleOnChnage = (e) => {
    setSearchTerm(e.target.value);
  }
  
  return (
    <>
    <header>
      <form onSubmit={handleOnSubmit}>
        <input 
            className="search" 
            type="search" 
            placeholder="Search..."
            value={searchTerm} 
            onChange={handleOnChnage}
        />
        </form>
    </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      </>
  );
}

        
export default App;
