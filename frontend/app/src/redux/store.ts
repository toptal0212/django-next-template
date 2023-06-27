import { configureStore } from "@reduxjs/toolkit";
import utilReducer from "./features/utilSlice";
// import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    utilReducer,
    // [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([logger]),
  // getDefaultMiddleware({}).concat([userApi.middleware, logger]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
