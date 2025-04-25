import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/store";
import { RootState } from "../index";
import { AuthError, AuthUser, ILoginInput, IRegisterInput } from "../../models/auth";
import fetchWithRetry from "../../utils/FetchWithRetry";
import { logError } from "../../utils/ErrorLogging";

export const loginAction = createAsyncThunk<
  ApiResponse,
  ILoginInput,
  { state: RootState }
>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      // const response = await fetchWithRetry(
      //   "http://127.0.0.1:4000/api/auth/login",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(credentials),
      //   },
      // );

      const data = await response.json();

      if (!response.ok) {

        return rejectWithValue(data.error);
      }
      console.log("login sucessful, ", data);

      // Store the token in localStorage
      localStorage.setItem("token", data.token);


      return data;
    } catch (error: any) {
      logError(error)
      return rejectWithValue({
        message: error.message || "Login failed"
      });
    }
  }
);

export const registerAction = createAsyncThunk<
  ApiResponse<AuthUser>,
  IRegisterInput,
  { state: RootState }
>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {

        return rejectWithValue(data.error);
      }

      return data;
    } catch (error: any) {

      return rejectWithValue(error);
    }
  }
);

export const restoreUser = createAsyncThunk<
  AuthUser,
  void,
  { state: RootState }
>("auth/restoreUser", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return rejectWithValue("No token found");
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
      console.log("restore user data: ", data.error);
      // Optionally, you can clear the token if the restoration fails
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

