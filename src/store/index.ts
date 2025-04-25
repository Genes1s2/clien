// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import CategorySlice from "./categories/slice";
// import DocumentSlice from "./document/slice";


// const rootReducer = combineReducers({
//   [CategorySlice.name]: CategorySlice.reducer,
//   [DocumentSlice.name]: DocumentSlice.reducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   // devTools: `${env.NODE_ENV}` !== "production" || `${env.NODE_ENV}` !== "test" ,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// Update your store configuration
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import sessionReducer from "./auth/restoreUser/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  session: sessionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;