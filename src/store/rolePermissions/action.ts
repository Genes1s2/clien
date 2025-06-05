import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserRole } from '../../models/rolePermissions';
import { Http } from '../../utils/Http';

// Helper function for handling fetch responses

// const handleResponse = async (response: Response) => {
//   const data = await response.json();
// 
//   if (!response.ok) {
//     const error = data.error || `HTTP error! status: ${response.status}`;
//     throw new Error(error);
//   }

//   return data;
// };

// Roles

// All roles
export const fetchRoles = createAsyncThunk(
  'roles/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await Http.get(`/access/roles`)
      return data;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch roles";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createRole = createAsyncThunk(
  'roles/create',
  async (roleData: UserRole, { rejectWithValue }) => {
    try {
      const data = await Http.post(`/access/roles`, roleData)
      return data;
      // const token = localStorage.getItem("token");
      // const response = await fetch(`http://127.0.0.1:4000/api/access/roles`, {
      //   method: "POST",
      //   headers: {
      //     "Authorization": `Bearer ${token}`,
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(roleData)
      // });

      // return await handleResponse(response);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create role";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateRole = createAsyncThunk(
  'roles/update',
  async ({ roleId, data }: { roleId: string; data: UserRole }, { rejectWithValue }) => {
    try {
      const datas = await Http.put(`/access/roles/${roleId}`, data)
      return datas;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update role";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteRole = createAsyncThunk(
  'roles/delete',
  async (roleId: string, { rejectWithValue }) => {
    try {
      const data = await Http.delete(`/access/roles/${roleId}`)
      return data;
      // return roleId;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete role";
      return rejectWithValue(errorMessage);
    }
  }
);

// Permissions
export const fetchPermissions = createAsyncThunk('permissions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await Http.get(`/access/permissions`)
      return data;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch permissions";
      return rejectWithValue(errorMessage);
    }
  }
);
