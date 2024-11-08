import React, { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./movieCard";
import "./App.css";
import Spinner from "./common/Spinner";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=164c1fa1";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);

  const searchMovies = async (title) => {
    setSaving(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    setSaving(false);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {saving ? (
        <Spinner />
      ) : (
        <>
          {movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
