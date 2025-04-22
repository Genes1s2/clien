import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category, FetchCategoriesAgrs } from "../../models/category";
import { ApiResponse, Pagination } from "../../models/store";

export const getAllCategoriesWithPaginationAction = createAsyncThunk<
  ApiResponse<{ categories: Category[]; pagination: Pagination }>,
  FetchCategoriesAgrs,
  any
>("categories/getAll", async (args, thunkApi) => {
  try {
    const response = await fetch("http://127.0.0.1:4000/api/category/categories");

    if (!response.ok) {
      const data = await response.json();
      console.log("Failed to fetch categories:", data);
    }
    
    const data = await response.json();
    console.log("fetch categories successfully:", data);
    return data;
  } catch (error) {
    console.log("Error occurred !!!");
  }
});

export const createCategoryAction = createAsyncThunk(
  "categories/create",
  async () => {
    try {
    } catch (error) {}
  }
);
