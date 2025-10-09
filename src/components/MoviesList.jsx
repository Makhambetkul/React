import MovieCard from "./MovieCard";
import "../styles/MoviesList.css";

export default function MoviesList({ items }) {
  if (!items.length) return <p className="hint">Click “Load” to fetch movies.</p>;

  return (
    <ul className="list">
      {items.map(item => (
        <li className="list-item" key={item.id}>
          <MovieCard
            title={item.title}
            year={item.year}
            rtScore={item.rtScore}
            desc={item.desc}
          />
        </li>
      ))}
    </ul>
  );
}
