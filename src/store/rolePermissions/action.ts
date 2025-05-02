import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserRole } from '../../models/rolePermissions';

// Helper function for handling fetch responses

const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.error || `HTTP error! status: ${response.status}`;
    throw new Error(error);
  }
  
  return data;
};

// Roles

// All roles
export const fetchRoles = createAsyncThunk(
  'roles/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/access/roles`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      return await handleResponse(response);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch roles";
      console.error('Role fetch error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createRole = createAsyncThunk(
  'roles/create',
  async (roleData: UserRole, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/access/roles`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(roleData)
      });

      return await handleResponse(response);
      
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
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/access/roles/${roleId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      return await handleResponse(response);
      
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
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/access/roles/${roleId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      return await handleResponse(response);
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
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/access/permissions`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      return await handleResponse(response);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch permissions";
      console.error('permissions fetch error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createPermission = createAsyncThunk('permissions/create', async (data: {
  name: string,
  description?: string
}) => {
  const response = await fetch('/api/permissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
});

export const updatePermission = createAsyncThunk('permissions/update', async ({
  id,
  data
}: {
  id: string,
  data: { name: string, description?: string }
}) => {
  const response = await fetch(`/api/permissions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
});

export const deletePermission = createAsyncThunk('permissions/delete', async (id: string) => {
  const response = await fetch(`/api/permissions/${id}`, {
    method: 'DELETE',
  });
  await handleResponse(response);
  return id;
});