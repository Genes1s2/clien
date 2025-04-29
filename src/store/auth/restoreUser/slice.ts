import { createSlice } from "@reduxjs/toolkit";
import { AsyncState, LoadingType } from "../../../models/store";
import { restoreUser } from "./actions";
import { RootState } from "../..";

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
  name: "session",
  initialState,
  reducers: {
    clearRestoreError: (state) => {
      state.currentUser.error = null;
    },
  },
  extraReducers: (builder) => {
    // Restore user
    builder
      .addCase(restoreUser.pending, (state) => {
        state.currentUser.status = LoadingType.PENDING;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.currentUser.status = LoadingType.SUCCESS;
        state.currentUser.entities = action.payload;
        state.isAuthenticated = true;
        state.currentUser.error = null;
      })
      .addCase(restoreUser.rejected, (state, action) => {
        state.currentUser.status = LoadingType.REJECTED;
        state.currentUser.error = action.payload as string;
        state.isAuthenticated = false;
      });

  },
});

export const { clearRestoreError } = authSlice.actions;

// export const selectCurrentUser = (state: RootState) => state.session.restoreStatus;

// export const selectIsAuthenticated = (state: RootState) =>
// state.auth.isAuthenticated;


export default authSlice.reducer;