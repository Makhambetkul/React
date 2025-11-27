
export async function getInitialMovies() {
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


export async function searchMovies(query) {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.map(obj => {
    const m = obj.show;
    return {
      id: m.id,
      title: m.name,
      year: (m.premiered || "").slice(0, 4),
      genres: (m.genres || []).join(", "),
      plot: (m.summary || "").replace(/<[^>]+>/g, "").trim()
    };
  });
}

export async function getMovieById(id) {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie by id");

  const m = await res.json();

  return {
    id: m.id,
    title: m.name,
    year: (m.premiered || "").slice(0, 4),
    genres: (m.genres || []).join(", "),
    plot: (m.summary || "").replace(/<[^>]+>/g, "").trim(),
    image: m.image?.medium || "",
  };
}

