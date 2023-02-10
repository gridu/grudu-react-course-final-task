import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/user';
import tweetsReducer from './redux/tweets/reducers';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tweets: tweetsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch