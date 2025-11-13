export async function searchMovies() {
  const res = await fetch("https://api.tvmaze.com/shows");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.slice(0, 30).map(m => ({
    id: m.id,
    title: m.name,
    year: (m.premiered || "").slice(0, 4),
    genres: (m.genres || []).join(", "),
    plot: (m.summary || "").replace(/<[^>]+>/g, "").trim()
  }));
}
