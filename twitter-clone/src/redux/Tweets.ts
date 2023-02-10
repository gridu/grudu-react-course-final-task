import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Tweet {
  id: string;
  author_id: string;
  text: string;
}

const initialState: Tweet[] = [];

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweets: (state, action: PayloadAction<Tweet[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setTweets } = tweetsSlice.actions;

export default tweetsSlice.reducer;
