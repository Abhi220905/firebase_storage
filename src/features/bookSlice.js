import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const userId = localStorage.getItem("userId");


export const addBook = createAsyncThunk("books/add", async (data) => {
  try {
    const newData = { userId, ...data };
    const res = await addDoc(collection(db, "books"), newData);

    return { id: res.id, ...newData };
  } catch (err) {
    console.log(err);
  }
});


export const viewBook = createAsyncThunk("books/view", async () => {
  try {
    const data = await getDocs(collection(db, "books"));

    return data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.log(err);
  }
});


export const deleteBook = createAsyncThunk("books/delete", async (id) => {
  try {
    await deleteDoc(doc(db, `books/${id}`));
    return { id };
  } catch (err) {
    console.log(err);
  }
});


export const updateBook = createAsyncThunk("books/update", async (data) => {
  try {
    const { id, ...rest } = data;
    await updateDoc(doc(db, `books/${id}`), rest);

    return { id, ...rest };
  } catch (err) {
    console.log(err);
  }
});


const bookSlice = createSlice({
  name: "books",
  initialState: {
    bookList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBook.fulfilled, (state, action) => {
        state.bookList.push(action.payload);
      })
      .addCase(viewBook.fulfilled, (state, action) => {
        state.bookList = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.bookList = state.bookList.filter(
          (book) => book.id !== action.payload.id
        );
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.bookList.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.bookList[index] = action.payload;
        }
      });
  },
});

export default bookSlice.reducer;
