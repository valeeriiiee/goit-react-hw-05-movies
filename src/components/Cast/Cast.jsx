import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../api/movieApi';
import styles from './Cast.module.css';

const Cast = ({ initialCast = [] }) => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(initialCast);

  useEffect(() => {
    const fetchData = async () => {
      const movieCast = await getMovieCredits(movieId);
      setCast(movieCast);
    };
    fetchData();
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      <ul className={styles.cast}>
        {cast.map(actor => (
          <li className={styles.castItem} key={actor.cast_id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} // Ensure this is the correct property for the image URL
              alt={actor.name}
              className={styles.actorImage}
            />
            <div className={styles.actorDetails}>
              <p className={styles.actorName}>{actor.name}</p>
              <p className={styles.actorCharacter}>
                Character: {actor.character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Cast.propTypes = {
  initialCast: PropTypes.arrayOf(
    PropTypes.shape({
      cast_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ),
};

export default Cast;
