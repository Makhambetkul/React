import { useState, useEffect, useMemo } from "react";
import { searchMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/MoviesList.css";

export default function MoviesList() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    searchMovies()
      .then(setItems)
      .catch(() => setError("Could not load data. Try again."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(it => (it.title || "").toLowerCase().includes(q));
  }, [items, query]);

  const clear = () => setQuery("");

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search by title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Escape") clear(); }}
        />
        {query && (
          <button className="clear-btn" onClick={clear} aria-label="Clear search">
            ×
          </button>
        )}
        <span className="search__count">{filtered.length}/{items.length}</span>
      </div>

      <ul className="list">
        {filtered.map(item => (
          <li className="list-item" key={item.id}>
            <MovieCard
              id={item.id}
              title={item.title}
              year={item.year}
              genres={item.genres}
              plot={item.plot}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
