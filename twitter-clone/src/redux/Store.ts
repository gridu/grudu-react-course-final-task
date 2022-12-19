import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User";
import tweetsReducer from "./Tweets";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tweets: tweetsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {users: User, tweets: Tweet[]}
export type AppDispatch = typeof store.dispatch;
