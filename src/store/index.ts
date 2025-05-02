import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import usereducer from "./user/slice";
import sessionReducer from "./auth/restoreUser/slice";
import rolePermissioneducer from "./rolePermissions/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  user: usereducer,
  rolePermissions: rolePermissioneducer
});

export const store = configureStore({
  reducer: rootReducer,
  //   // devTools: `${env.NODE_ENV}` !== "production" || `${env.NODE_ENV}` !== "test" ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;