import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { AuthError, AuthUser } from "../../../models/auth";
import { Http } from "../../../utils/Http";

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
        const data = await Http.get(`/auth/me`)
        return data;
  } catch (error: any) {
    console.log('error: ', error);
    
    let errorMessage: AuthError = 'Session restoration failed';
    
    if (error.message.includes("401")) {
      return errorMessage = 'SESSION_EXPIRED';
    } else if (error.message.includes("Network Error")) {
      return errorMessage = 'Network error';
    }
    return rejectWithValue(error instanceof Error ? error.message :  "Failed to restore user");
    // return rejectWithValue(errorMessage || "Failed to restore user");
  }
});

