import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api/movieApi';
import styles from './Reviews.module.css';

const Reviews = ({ initialReviews = [] }) => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieReviews = await getMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (error) {
        console.error('Failed to fetch movie reviews:', error);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {reviews.length === 0 ? (
        <p>There are no reviews for this movie</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>
                <strong>
                  Author:&nbsp;
                  {review.author}
                </strong>
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Reviews.propTypes = {
  initialReviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default Reviews;
