import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTrendingMovies } from '../../api/movieApi';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeHeader}>Trending today</h1>
      <ul className={styles.movieList}>
        {movies.map(movie => (
          <li className={styles.movieListItem} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Home.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default Home;
