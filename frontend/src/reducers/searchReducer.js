import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'searchActionReducer',
  initialState: { q:'', results: [] , trendingPosts:[]},
  reducers: {
    performSearchAction(state, action) {
      state.query = action.payload.query;
      state.results = action.payload.results;
    },
    findTrendingPosts(state, action) {
      state.trendingPosts = action.payload.trendingPosts;
    }
  },
});

const { actions, reducer } = searchSlice;
export const { performSearchAction, findTrendingPosts } = actions;
export default searchSlice;
