import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TweetProps } from '../../pages/Home/components/Tweet';

const initialState: TweetProps[] = [];

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    getTweets: (state, action: PayloadAction<TweetProps[]>) => {
      state = action.payload;
      return state;
    },
  },
})

export const { getTweets } = tweetsSlice.actions

export default tweetsSlice.reducer