import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/store";
import { RootState } from "../index";
import { AuthUser, ILoginInput, IRegisterInput } from "../../models/auth";
import { logError } from "../../utils/ErrorLogging";
import { HTTP } from "../../utils/Http";

export const loginAction = createAsyncThunk<
  ApiResponse,
  ILoginInput,
  { state: RootState }
>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${HTTP}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      // );

      const data = await response.json();

      if (!response.ok) {

        return rejectWithValue(data.error);
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token);

      return data;
    } catch (error: any) {
      logError(error)
      return rejectWithValue(error instanceof Error ? error.message :  "Login failed");
      // return rejectWithValue({
      //   message: error.message || "Login failed"
      // });
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
      const response = await fetch(`${HTTP}/auth/register`, {
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

      return rejectWithValue(error instanceof Error ? error.message :  "Registration failed");
    }
  }
);


export const forgotPasswordAction = createAsyncThunk<
  ApiResponse,
  { email: string },
  { state: RootState }
>(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${HTTP}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error);
      return data;
    } catch (error: any) {
      return rejectWithValue(error instanceof Error ? error.message :  " Failed");
    }
  }
);

export const resetPasswordAction = createAsyncThunk<
  ApiResponse,
  { email: string; otp: string; newPassword: string },
  { state: RootState }
>(
  "auth/resetPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${HTTP}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error);
      return data;
    } catch (error: any) {
      return rejectWithValue(error instanceof Error ? error.message :  "Password reset failed");
    }
  }
);