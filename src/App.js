import './App.css';

import Movie from "./components/Movie";

import React, { useEffect, useState } from "react";
import DetailMovie from './components/DetailMovie';

const FEATURED_API ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2ae13bacb05742feb24cddf8e6d72335&page=1";
const IMG_API = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=2ae13bacb05742feb24cddf8e6d72335&query="
const TOP_10_MOVIES = "https://api.themoviedb.org/3/movie/top_rated?api_key=2ae13bacb05742feb24cddf8e6d72335&language=en-US&page=1"

const headerTitles = {
  FEATURED_API: "Featured movies",
  SEARCH_API: "Search results",
  TOP_10_MOVIES: "Top 10 movies"
}

function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [headerTitle, setHeaderTitle] = useState('')
  const [detailMovie, setDetailMovie] = useState(null)

  // Call search API dependency of searchTerm
  useEffect(() => {
    if (searchTerm.length === 0) {
      if (activeTab === 0) {
        getMovies(FEATURED_API);
        setHeaderTitle(headerTitles['FEATURED_API'])
      } else {
        getMovies(TOP_10_MOVIES, 10);
        setHeaderTitle(headerTitles['TOP_10_MOVIES'])
  
      }
    } else {
      // Append to API searchTerm
      getMovies(`${SEARCH_API}${searchTerm}`);
      setHeaderTitle(headerTitles['SEARCH_API'])
    }
  }, [activeTab, searchTerm])

  const getMovies = (API, perPage = 20) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
       setMovies(data.results && data.results.slice(0, perPage));
    });
  }

  const handleOnChnage = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }
  
  return (
    <>
    <header>
      <h2 className='header-title'>{searchTerm && searchTerm.length > 0 ? `${headerTitle}: ${searchTerm}` : headerTitle}</h2>
      <input 
          className="search" 
          type="search" 
          placeholder="Search..."
          value={searchTerm} 
          onChange={(e) => handleOnChnage(e)}
      />
    </header>
    <div className="movie-main">
      <button 
        className={`${activeTab === 0 ? 'active' : ''}`}
        onClick={() => setActiveTab(0)}>
          FEATURED MOVIES
      </button>
      <button 
        className={`${activeTab === 1 ? 'active' : ''}`}
        onClick={() => setActiveTab(1)}>
          10 MOVIES/TV SHOWS
      </button>
    </div>
      {detailMovie ? (
        <DetailMovie movie={detailMovie} setDetailMovie={setDetailMovie}/>
      ) : (
        <div className="movie-container">
          {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} movie={movie} setDetailMovie={setDetailMovie}/>)}
        </div>
      )}
      </>
  );
}

        
export default App;