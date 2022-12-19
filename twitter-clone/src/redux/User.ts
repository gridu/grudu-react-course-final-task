import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  loggedIn: boolean;
}

const initialState: User = {
  id: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
      return state;
    },
    unsetUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
