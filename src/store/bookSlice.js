import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Creating action
export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3001/books");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const insertBook = createAsyncThunk(
  "books/insertBook",
  async (bookData, thunkAPI) => {
    // getting to a particular state !!!!!
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    // deleting repeated titles
    let del = false;
    const { books } = getState().books;
    for (let book of books) {
      if (book.title == bookData.title) {
        dispatch(deleteBook(book.idwqknwd));
      }
    }

    console.log("book title:", bookData.title);

    try {
      bookData.author = getState().auth.name;
      const res = await fetch("http://localhost:3001/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue();
    }
  }
);

export const getBook = createAsyncThunk(
  "books/getBook",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:3001/books/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:3001/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const currentState = getState().books.books.filter((b) => b.id != id);
      console.log("current StatE: ", currentState);
      return currentState;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  books: [],
  isLoading: true,
  error: null,
  bookDetails: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: {
    // get books
    [getBooks.pending]: (state, action) => {},
    [getBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
      state.isLoading = false;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // insert books
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // deleteBooks
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // Getting a particual book
    [getBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookDetails = action.payload;
      console.log("book by id:", action.payload);
    },
    [getBook.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default bookSlice.reducer;
