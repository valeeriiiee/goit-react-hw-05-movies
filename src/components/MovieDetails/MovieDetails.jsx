import React, { useEffect, useState } from 'react';
import { useParams, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../api/movieApi';
import styles from './MovieDetails.module.css';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };
    fetchData();
  }, [movieId]);

  const handleGoBack = () => {
    navigate('/'); // Navigate to the home page
  };

  if (!movie) return <div>Loading...</div>;

  const releaseYear = movie.release_date.split('-')[0];

  const genresList = movie.genres.map(genre => genre.name).join(', ');

  return (
    <div>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go Back
      </button>
      <div className={styles.movieDetailsContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Ensure this is the correct property for the image URL
          alt={movie.title}
          className={styles.movieImage}
        />
        <div className={styles.movieDetails}>
          <h2 className={styles.movieTitle}>
            {movie.title}&nbsp;({releaseYear})
          </h2>
          <p className={styles.userScore}>
            User Score: {movie.vote_average * 10}%
          </p>
          <h3 className={styles.detailsHeader}>Overview</h3>
          <p>{movie.overview}</p>
          <h3 className={styles.detailsHeader}>Genres</h3>
          <p>{genresList}</p>
        </div>
      </div>
      <div className={styles.additionalInfoContainer}>
        <h3>Additional Information</h3>
        <ul className={styles.additionalInfo}>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="cast" element={<Cast />} />
        <Route path="reviews" element={<Reviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetails;
