import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  token: string;
}

interface InitialState {
  user?: User;
}

const initialState = {} as InitialState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
