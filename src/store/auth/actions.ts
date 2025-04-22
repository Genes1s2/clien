import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/store";
import { RootState } from "../index";
import { ILoginInput, IRegisterInput } from "../../models/auth";

export const loginAction = createAsyncThunk<
  ApiResponse<{ token: string }>,
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
        console.log("Login failed try", data);
        
         alert(data.error)
        return rejectWithValue(data);
      }
      
      console.log("login sucessful: ", data);
      return data;
    } catch (error: any) {
      console.log("Login failed log", error);
      return alert(error)
      
      return rejectWithValue({ 
        message: error.message || "Login failed" 
      });
    }
  }
);

export const registerAction = createAsyncThunk<
  ApiResponse,
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
         alert(data.error)
        return rejectWithValue(data);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue({ 
        message: error.message || "Registration failed" 
      });
    }
  }
);