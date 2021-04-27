import './App.css';

import Movie from "./components/Movie";

import React, { useEffect, useState } from "react";

const FEATURED_API ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2ae13bacb05742feb24cddf8e6d72335&page=1";
const IMG_API = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=2ae13bacb05742feb24cddf8e6d72335&query="
const TOP_10_MOVIES = "https://api.themoviedb.org/3/movie/top_rated?api_key=2ae13bacb05742feb24cddf8e6d72335&language=en-US&page=1"

function App() {
  const [ info, setInfo] = useState([]);
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {   
    fetchInfo();
    getMovies(FEATURED_API);

    if(searchTerm.length == 0){
      fetch(`{API}$query=${search}`);
    }else {
      fetch(`{API}$query=${search}`);
    }
    },[searchTerm]);

    
  

  const fetchInfo = () => {
    fetch(`{API}$query=${search}`)
      .then((result) => result.json())
      .then((data) => search(data.hits))
      .catch((err) => console.log(err));
  };

  const getMovies = (API) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
       setMovies(data.results);
    });
  }

  const handleOnChnage = (e) => {
    e.preventDefault();

    if(searchTerm.length > 1) {
      getMovies(SEARCH_API + searchTerm);
 
    } 

   setSearchTerm(e.target.value);

  }
  
  return (
    <>
    <header>
        <input 
            className="search" 
            type="search" 
            placeholder="Search..."
            value={searchTerm} 
            onChange={handleOnChnage}
        />
        {info.map((n,i) => <p key={i}>
        {n.title}
        </p>
        )}
    </header>
    <div className="movie-main">
      10 MOVIES/TV SHOWS
    </div>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      </>
  );
}

        
export default App;