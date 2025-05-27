import { createSlice } from "@reduxjs/toolkit";
import { AsyncState, LoadingType } from "../../models/store";
import { forgotPasswordAction, loginAction, registerAction, resetPasswordAction } from "./actions";
import { RootState } from "..";

type AuthState = {
  currentUser: AsyncState<any>;
  resetPasswordStatus: AsyncState<any>;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  currentUser: {
    entities: null,
    status: LoadingType.IDLE,
    error: null,
  },
  resetPasswordStatus: {
    entities: null,
    status: LoadingType.IDLE,
    error: null,
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.currentUser.error = null;
      state.currentUser.status = LoadingType.IDLE;
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginAction.pending, (state) => {
        state.currentUser.status = LoadingType.PENDING;
        state.currentUser.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.currentUser.status = LoadingType.SUCCESS;
        state.currentUser.entities = action.payload;
        state.currentUser.error = null;
        state.isAuthenticated = true;

      })
      .addCase(loginAction.rejected, (state, action) => {
        state.currentUser.status = LoadingType.REJECTED;
        state.currentUser.entities = null;
        state.currentUser.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerAction.pending, (state) => {
        state.currentUser.status = LoadingType.PENDING;
        state.currentUser.error = null;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.currentUser.status = LoadingType.SUCCESS;
        state.currentUser.entities = action.payload.data;
        state.currentUser.error = null;
        state.isAuthenticated = true;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.currentUser.status = LoadingType.REJECTED;
        state.currentUser.entities = null;
        state.currentUser.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Forgot Password
    builder
      .addCase(forgotPasswordAction.pending, (state) => {
        state.resetPasswordStatus.status = LoadingType.PENDING;
        state.resetPasswordStatus.error = null;
      })
      .addCase(forgotPasswordAction.fulfilled, (state) => {
        state.resetPasswordStatus.status = LoadingType.SUCCESS;
        state.resetPasswordStatus.error = null;
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.resetPasswordStatus.status = LoadingType.REJECTED;
        state.resetPasswordStatus.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPasswordAction.pending, (state) => {
        state.resetPasswordStatus.status = LoadingType.PENDING;
        state.resetPasswordStatus.error = null;
      })
      .addCase(resetPasswordAction.fulfilled, (state) => {
        state.resetPasswordStatus.status = LoadingType.SUCCESS;
        state.resetPasswordStatus.error = null;
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.resetPasswordStatus.status = LoadingType.REJECTED;
        state.resetPasswordStatus.error = action.payload as string;
      });

  },
});

export const { logout, clearError } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;


export default authSlice.reducer;