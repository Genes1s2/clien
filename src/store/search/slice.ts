import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchDocuments } from "./action";

interface SearchState {
  results: any[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
}

const initialState: SearchState = {
  results: [],
  isLoading: false,
  error: null,
  isModalOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDocuments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.data;
        state.isModalOpen = true;
      })
      .addCase(searchDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isModalOpen = true;
      });
  },
});

export const { setSearchModalOpen } = searchSlice.actions;
export default searchSlice.reducer;