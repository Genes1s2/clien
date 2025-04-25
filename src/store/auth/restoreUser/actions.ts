import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { AuthError, AuthUser } from "../../../models/auth";
import fetchWithRetry from "../../../utils/FetchWithRetry";

export const restoreUser = createAsyncThunk<
  AuthUser,
  void,
  { state: RootState }
>("auth/restoreUser", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return rejectWithValue("No authentication token found");
  }

  try {
    const response = await fetchWithRetry("http://127.0.0.1:4000/api/auth/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log("restore user data: ", data);
    
    
    if (!response.ok) {
      console.log("restore error ", data.error);
      
      localStorage.removeItem("token");
      return rejectWithValue(data.error || "Failed to restore user");
    }

    return data; 
  } catch (error: any) {
    let errorMessage: AuthError = 'SESSION_RESTORE_FAILED';
    
    if (error.message.includes("401")) {
      errorMessage = 'SESSION_EXPIRED';
    } else if (error.message.includes("Network Error")) {
      errorMessage = 'NETWORK_ERROR';
    }
    
    return rejectWithValue(errorMessage || "Failed to restore user");
    // return rejectWithValue(error.message || "Failed to restore user");
  }
});

