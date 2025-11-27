import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, setQuery } from "../features/movies/moviesSlice";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/MoviesList.css";

export default function MoviesList() {
  const dispatch = useDispatch();

  const {
    list: items,
    loadingList: loading,
    errorList: error,
    query,
  } = useSelector((state) => state.movie);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchMovies(query));
    }, 400);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies…"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />

        {query && (
          <button className="clear-btn" onClick={() => dispatch(setQuery(""))}>
            ×
          </button>
        )}

        <span className="search__count">
          {items.length > 0 ? `${items.length} results` : ""}
        </span>
      </div>

      {loading && <Spinner />}
      {error && <ErrorBox message={error} />}

      <ul className="list">
        {items.map((item) => (
          <li className="list-item" key={item.id}>
            <MovieCard {...item} />
          </li>
        ))}
      </ul>

      {!loading && query && items.length === 0 && (
        <p>No results found for “{query}”.</p>
      )}
    </>
  );
}
