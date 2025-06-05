import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTPFILE } from "../../utils/Http";

export const searchDocuments = createAsyncThunk(
  "search/documents",
  async (query: string, { rejectWithValue }) => {
    try {
      const url = new URL("/api/find/search", HTTPFILE);
      url.searchParams.append("q", query);
      url.searchParams.append("page", "1");
      url.searchParams.append("pageSize", "10");

      const token = localStorage.getItem("token");
      const response = await fetch(url.toString(), {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error.message || "Search failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch documents');
    }
  }
);