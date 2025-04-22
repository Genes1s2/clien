import { createSlice } from "@reduxjs/toolkit";
import { AsyncState, LoadingType } from "../../models/store";
import { loginAction, registerAction } from "./actions";
import { RootState } from "..";

type AuthState = {
  currentUser: AsyncState<any>;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  currentUser: {
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
    logout: (state) => {
      state.currentUser = {
        entities: null,
        status: LoadingType.IDLE,
        error: null,
      };
      state.isAuthenticated = false;
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
        state.currentUser.entities = action.payload.data;
        state.currentUser.error = null;
        state.isAuthenticated = true;
        console.log("log slice, ", state.currentUser.entities, action.payload.data);
        
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
  },
});

export const { logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsAuthenticated = (state: RootState) => 
  state.auth.isAuthenticated;

export default authSlice.reducer;