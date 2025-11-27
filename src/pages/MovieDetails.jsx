import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById } from "../features/movies/moviesSlice";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedMovie: movie, loadingItem: loading, errorItem: error } = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  if (!movie) return null;

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      <h2>{movie.title}</h2>
      {movie.image && <img src={movie.image} alt={movie.title} />}
      <div className="text">
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Genres:</strong> {movie.genres}</p>
        <p>{movie.plot}</p>
      </div>
    </div>
  );
}
