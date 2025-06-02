import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { AuthError, AuthUser } from "../../../models/auth";

export const restoreUser = createAsyncThunk<
  AuthUser,
  void,
  { state: RootState }
>("auth/restoreUser", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return rejectWithValue("No authenticate session found, please log in.");
  }

  try {
    const response = await fetch("http://127.0.0.1:4000/api/auth/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      
      localStorage.removeItem("token");
      return rejectWithValue(data.error || "Failed to restore user");
    }

    return data; 
  } catch (error: any) {
    let errorMessage: AuthError = 'SESSION_RESTORE_FAILED';
    
    if (error.message.includes("401")) {
      return errorMessage = 'SESSION_EXPIRED';
    } else if (error.message.includes("Network Error")) {
      return errorMessage = 'NETWORK_ERROR';
    }
    
    return rejectWithValue(errorMessage || "Failed to restore user");
  }
});

