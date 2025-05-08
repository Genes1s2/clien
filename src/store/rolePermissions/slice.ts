import { createSlice } from '@reduxjs/toolkit';
import { fetchRoles, createRole, updateRole, deleteRole, fetchPermissions } from './action';
import { LoadingType } from '../../models/store';
import { log } from 'console';

interface RolePermissionState {
  roles: any[];
  permissions: any[];
  currentRole: any | null;
  status: LoadingType;
  error: string | null;
}

const initialState: RolePermissionState = {
  roles: [],
  permissions: [],
  currentRole: null,
  status: LoadingType.IDLE,
  error: null
};

const rolePermissionSlice = createSlice({
  name: 'rolePermission',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Roles
    // All roles
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = LoadingType.PENDING;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.error.message || 'Failed to fetch roles';
      })

      // Create role
    builder
      .addCase(createRole.pending, (state) => {
        state.status = LoadingType.PENDING;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        // state.roles = action.payload;
        state.roles.unshift(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
      })

      // Update role
      
    builder
    .addCase(updateRole.pending, (state) => {
      state.status = LoadingType.PENDING;
    })
    .addCase(updateRole.fulfilled, (state, action) => {
      state.status = LoadingType.SUCCESS;
      // state.roles = action.payload;
        const index = state.roles.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.roles[index] = action.payload;
    })
    .addCase(updateRole.rejected, (state, action) => {
      state.status = LoadingType.REJECTED;
    })

    //Delete role
    builder
      .addCase(deleteRole.pending, (state) => {
        state.status = LoadingType.PENDING;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.roles = state.roles.filter(c => c.id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
      })
      
      // Permissions
      // All permissions
      builder
      .addCase(fetchPermissions.pending, (state) => {
        state.status = LoadingType.PENDING;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.permissions = action.payload;
        
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.error.message || 'Failed to fetch roles';
      })


  }
});

export default rolePermissionSlice.reducer;