// store/user/actions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "../../utils/Http";

//Update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ userId, data }: { userId: string; data: any }, { rejectWithValue }) => {
    try {
      const datas = await Http.put(`/user/profile/${userId}`, data)
      return datas;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to update user profile");
    }
  }
);

// Change password
export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async ({ userId, data }: { userId: string; data: any }, { rejectWithValue }) => {
    try {
      const datas = await Http.put(`/user/password/${userId}`, data)
      return datas;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to change password");
    }
  }
);

// Desactivate user
export const desactivateUser = createAsyncThunk(
  "user/desactivateUser",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const datas = await Http.put(`/user/inactive/${userId}`)
      return datas;
      // const token = localStorage.getItem("token");
      // const response = await fetch(`http://127.0.0.1:4000/api/user/inactive/${userId}`, {
      //   method: "PUT",
      //   headers: {
      //     "Authorization": `Bearer ${token}`,
      //     "Content-Type": "application/json"
      //   }
      // });

      // const data = await response.json()

      // if (!response.ok) {

      //   return rejectWithValue(data.error);
      // }

      // return data;

    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to desactivate user");
    }
  }
);

// Admin routes

// Get user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const data = await Http.get(`/user/profile/${userId}`)
      return data;

    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch profile");
    }
  }
);

// Get all user
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const data = await Http.get(`/user/users`)
      return data;

    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch users");
    }
  }
);

// Restore user
export const activateUser = createAsyncThunk(
  "user/activateUser",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const data = await Http.put(`/user/active/${userId}`)
      return data;

    } catch (error) {
      return rejectWithValue(error || "Failed to activate user");
    }
  }
);

// Get all active user
export const getAllActiveUsers = createAsyncThunk(
  "user/getAllActiveUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const data = await Http.get(`/user/active-users`)
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch active users");
    }
  }
);

// Get all inactive user
export const getAllInactiveUsers = createAsyncThunk(
  "user/getAllInactiveUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const data = await Http.get(`/user/inactive-users`)
      return data;

    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch inactive users");
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async ({ userId, data }: { userId: string; data: { roleId: string } }, { rejectWithValue }) => {
    try {
      const datas = await Http.put(`/user/admin/${userId}/role`, data)
      return datas;
      // const token = localStorage.getItem("token");
      // const response = await fetch(`http://127.0.0.1:4000/api/user/admin/${userId}/role`, {
      //   method: "PUT",
      //   headers: {
      //     "Authorization": `Bearer ${token}`,
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(data)
      // });


      // const datas = await response.json()

      // if (!response.ok) {

      //   return rejectWithValue(datas.error);
      // }

      // return datas;

    } catch (error) {
       return rejectWithValue(error instanceof Error ? error.message : "Failed to update user role");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const data = await Http.delete(`/user/admin/${userId}`)
      return data;

    } catch (error) {
      return rejectWithValue(error || "Failed to desactivate user");
    }
  }
);