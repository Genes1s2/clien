// store/user/actions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRole } from "../../models/rolePermissions";

//Update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ userId, data }: { userId: string; data: any }, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const datas = await response.json()

      if (!response.ok) {
        return rejectWithValue(datas.error);
      }

      return datas;
    } catch (error) {
      return rejectWithValue("Failed to update profile");
    }
  }
);

// Change password
export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async ({ userId, data }: { userId: string; data: any }, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/password/${userId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const datas = await response.json()

      if (!response.ok) {
        if (datas.error.status === 404) return rejectWithValue(datas.error.message);

        return rejectWithValue(datas.error);
      }

      return datas;
    } catch (error) {
      return rejectWithValue("Failed to change password");
    }
  }
);

// Desactivate user
export const desactivateUser = createAsyncThunk(
  "user/desactivateUser",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/inactive/${userId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json()

      if (!response.ok) {

        return rejectWithValue(data.error);
      }

      return data;

    } catch (error) {
      return rejectWithValue(error || "Failed to desactivate user");
    }
  }
);

// Admin routes

// Get user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/profile/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json()

      if (!response.ok) {

        return rejectWithValue(data.error);
      }

      return data;

    } catch (error) {
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

// Get all user
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/users`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json()

      if (!response.ok) {

        return rejectWithValue(data.error);
      }

      return data;

    } catch (error) {
      return rejectWithValue(error || "Failed to fetch all users");
    }
  }
);

// Restore user
export const activateUser = createAsyncThunk(
  "user/activateUser",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/active/${userId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json()

      if (!response.ok) {

        return rejectWithValue(data.error);
      }

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
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/active-users`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json()

      if (!response.ok) {

        return rejectWithValue(data.error);
      }

      return data;

    } catch (error) {
      return rejectWithValue(error || "Failed to fetch active users");
    }
  }
);

// Get all inactive user
export const getAllInactiveUsers = createAsyncThunk(
  "user/getAllInactiveUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/inactive-users`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json()

      if (!response.ok) {

        return rejectWithValue(data.error);
      }

      return data;

    } catch (error) {
      return rejectWithValue(error || "Failed to fetch inactive users");
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async ({ userId, data }: { userId: string; data: { roleId: string } }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/admin/${userId}/role`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      

      const datas = await response.json()

      if (!response.ok) {

        return rejectWithValue(datas.error);
      }

      return datas;

    } catch (error) {
      return rejectWithValue(error || "Failed to desactivate user");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/user/admin/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json()

      if (!response.ok) {

        return rejectWithValue(data.error);
      }

      return data;

    } catch (error) {
      return rejectWithValue(error || "Failed to desactivate user");
    }
  }
);