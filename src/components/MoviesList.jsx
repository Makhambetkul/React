import { useMemo, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../styles/MoviesList.css";

export default function MoviesList({ items }) {
  const [query, setQuery] = useState(""); 

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(it => (it.title || "").toLowerCase().includes(q));
  }, [items, query]);


  useEffect(() => {
    console.log(`Filtered movies count: ${filtered.length}`);
  }, [filtered]);

  const clear = () => setQuery("");

  if (!items.length) return <p className="hint">Click “Load” to fetch movies.</p>;

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