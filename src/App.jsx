import { useState } from "react";
import MoviesList from "./components/MoviesList";      
import "./styles/MoviesList.css";                      

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("https://ghibliapi.vercel.app/films");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const list = data.map(m => ({
        id: m.id,
        title: m.title,
        year: m.release_date,
        rtScore: m.rt_score,
        desc: m.description,
      }));
      setItems(list);
    } catch {
      setError("Could not load data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>MoviesList</h1>

      <button className="load-btn" onClick={loadData} disabled={loading}>
        {loading ? "Loading..." : "Load"}
      </button>

      {error && <p className="error">{error}</p>}

      {}
      <MoviesList items={items} />
    </div>
  );
}
