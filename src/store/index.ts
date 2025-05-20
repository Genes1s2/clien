import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import usereducer from "./user/slice";
import sessionReducer from "./auth/restoreUser/slice";
import rolePermissionreducer from "./rolePermissions/slice";
import categoryreducer from "./categories/slice";
import documentreducer from "./document/slice";
import searchReducer from "./search/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  user: usereducer,
  rolePermissions: rolePermissionreducer,
  categories: categoryreducer,
  documents: documentreducer,
  search: searchReducer
});

export const store = configureStore({
  reducer: rootReducer,
  //   // devTools: `${env.NODE_ENV}` !== "production" || `${env.NODE_ENV}` !== "test" ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;