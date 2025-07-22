import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('Setting user:', action.payload);
      state.user = action.payload;
    },
    clearUser(state) {
      console.log('Clearing user');
      state.user = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;