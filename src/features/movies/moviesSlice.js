import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query = "") => {
    let response;

    if (!query.trim()) {
      response = await fetch("https://api.tvmaze.com/shows");
      const data = await response.json();
      return data.slice(0, 30).map((m) => ({
        id: m.id,
        title: m.name,
        year: (m.premiered || "").slice(0, 4),
        genres: (m.genres || []).join(", "),
        plot: (m.summary || "").replace(/<[^>]+>/g, "").trim(),
      }));
    }

    response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await response.json();

    return data.map((obj) => {
      const m = obj.show;
      return {
        id: m.id,
        title: m.name,
        year: (m.premiered || "").slice(0, 4),
        genres: (m.genres || []).join(", "),
        plot: (m.summary || "").replace(/<[^>]+>/g, "").trim(),
      };
    });
  }
);


export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
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
);


const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    selectedMovie: null,
    loadingList: false,
    loadingItem: false,
    errorList: null,
    errorItem: null,
    query: "",
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchMovies.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.error.message;
      })

      .addCase(fetchMovieById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.error.message;
      });
  },
});

export const { setQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
