import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './slices/posts';

const store = configureStore({
  reducer: {
    postsSlice,
  },
});
export default store;
