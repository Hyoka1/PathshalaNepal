import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  loading: false,
  error: null,
  filters: {
    searchTerm: "",
    category: null,
    minPrice: null,
    maxPrice: null,
    onSale: null,
    sortBy: "title",
    sortDescending: false,
    pageNumber: 1,
    pageSize: 10,
  },
  totalPages: 0,
  selectedBook: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/book", { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/book/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload, pageNumber: 1 };
    },
    setPage: (state, action) => {
      state.filters.pageNumber = action.payload;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.books = action.payload;
          state.totalPages = 1;
        } else {
          state.books = action.payload.items || [];
          state.totalPages = action.payload.totalPages || 1;
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage, clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
