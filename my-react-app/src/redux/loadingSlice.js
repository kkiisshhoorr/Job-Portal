import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading(state) {
      console.log('Loading started');
      state.isLoading = true;
    },
    stopLoading(state) {
      console.log('Loading stopped');
      state.isLoading = false;
    }
  }
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;