import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from './actions';
import { LoadingType } from '../../models/store';

interface CategoryState {
  items: any[];
  status: LoadingType;
  error: string | null;
}

const initialState: CategoryState = {
  items: [],
  status: LoadingType.IDLE,
  error: null
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items.unshift(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      });
  }
});

export default categorySlice.reducer;