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
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      return state;
    },
    unsetUser: (state) => {
      state = initialState;
      return state;
    },
  },
})

export const { setUser, unsetUser } = userSlice.actions

export default userSlice.reducer