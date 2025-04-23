import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/store";
import { RootState } from "../index";
import { AuthUser, ILoginInput, IRegisterInput } from "../../models/auth";

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

      const data = await response.json();

      if (!response.ok) {

        return rejectWithValue(data.error);
      }
      console.log("login sucessful, ", data);

      // Store the token in localStorage
      localStorage.setItem("token", data.token);


      return data;
    } catch (error: any) {
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
    const response = await fetch("http://127.0.0.1:4000/api/auth/me", {
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
      alert("Error restoring user: ");
      // Optionally, you can clear the token if the restoration fails
      localStorage.removeItem("token");
      return rejectWithValue(data.error || "Failed to restore user");
    }

    return data; 
  } catch (error: any) {
    return rejectWithValue(error.message || "Restore failed");
  }
});

