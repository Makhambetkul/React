import "../styles/MovieCard.css";

export default function MovieCard({ title, year, director, genres, plot }) {
  return (
    <article className="card">
      <header className="card__header">
        <h3 className="card__title">{title}</h3>
        <span className="card__pill">{year}</span>
      </header>
      <p className="card__meta"><strong>Genres:</strong>{genres} </p>
      <p className="card__desc">{plot || "No description available"}</p>
    </article>
  );
}
