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
        console.log("action.payload.data, ", action.payload);

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

    // Restore user
    // builder
    //   .addCase(restoreUser.pending, (state) => {
    //     state.currentUser.status = LoadingType.PENDING;
    //   })
    //   .addCase(restoreUser.fulfilled, (state, action) => {
    //     state.currentUser.status = LoadingType.SUCCESS;
    //     state.currentUser.entities = action.payload;
    // state.isAuthenticated = true;
    //     state.currentUser.error = null;
    //   })
    //   .addCase(restoreUser.rejected, (state, action) => {
    //     state.currentUser.status = LoadingType.REJECTED;
    //     state.currentUser.error = action.payload as string;
    //     state.isAuthenticated = false;
    //   });
    
  },
});

export const { logout, clearError } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;


export default authSlice.reducer;