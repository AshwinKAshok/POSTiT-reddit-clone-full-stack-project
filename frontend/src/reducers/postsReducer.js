import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'postReducer',
  initialState: { posts: [] },
  reducers: {

      findPostsForPerson(state, action) {
          state.posts = [];
          state.posts.push(...action.payload.posts);
      },
      createPost(state, action) {
          state.posts.push(action.payload.newPost);
      },

      deletePost(state, action) {
          state.posts = state.posts.filter(post => post.id !== action.payload.postToDeleteId)
      }
  }
});


const { actions, reducer } = postSlice;
export const { findPostsForPerson, deletePost, createPost } = actions;
export default postSlice;
