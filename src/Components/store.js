// File: src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../Features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});