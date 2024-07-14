import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { searchMovies } from '../../api/movieApi';
import styles from './Movies.module.css';
import { Link } from 'react-router-dom';

const Movies = ({ query: initialQuery = '', initialMovies = [] }) => {
  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState(initialMovies);

  const handleSearch = async event => {
    event.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <div className={styles.moviesContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies..."
          className={styles.searchInput}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
      <ul>
        {movies.map(movie => (
          <li className={styles.moviesItem} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Movies.propTypes = {
  query: PropTypes.string,
  initialMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default Movies;
