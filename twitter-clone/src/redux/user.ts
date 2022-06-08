import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  fullName: string;
  userId: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  fullName: '',
  userId: '',
  loggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      return state;
    },
    unset: (state) => {
      state = initialState;
      return state;
    },
  },
})

export const { set, unset } = userSlice.actions

export default userSlice.reducer