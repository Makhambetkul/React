import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/Layout.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load movie");
        return res.json();
      })
      .then(setMovie)
      .catch(() => setError("Movie not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="detail">
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{movie.name}</h2>
      <img src={movie.image?.medium} alt={movie.name} />
      <p dangerouslySetInnerHTML={{ __html: movie.summary }}></p>
      <p><strong>Genres:</strong> {movie.genres.join(", ")}</p>
      <p><strong>Language:</strong> {movie.language}</p>
      <p><strong>Premiered:</strong> {movie.premiered}</p>
      <p><strong>Rating:</strong> {movie.rating?.average || "N/A"}</p>
      <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
    </div>
  );
}
