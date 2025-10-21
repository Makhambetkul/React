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
      const res = await fetch("https://api.tvmaze.com/shows");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const list = data.slice(0, 30).map(m => ({
        id: m.id,
        title: m.name,
        year: (m.premiered || "").slice(0, 4),
        genres: (m.genres || []).join(", "),
        plot: (m.summary || "").replace(/<[^>]+>/g, "").trim()
        
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
