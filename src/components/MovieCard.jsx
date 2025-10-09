import "../styles/MovieCard.css";

export default function MovieCard({ title, year, rtScore, desc }) {
  return (
    <article className="card">
      <header className="card__header">
        <h3 className="card__title">{title}</h3>
        <span className="card__pill">{year}</span>
      </header>
      <p className="card__meta">Rotten Tomatoes: {rtScore}%</p>
      <p className="card__desc">{desc}</p>
    </article>
  );
}
