import { createSlice } from "@reduxjs/toolkit";

const currentSelectedPostSlice = createSlice({
    name: 'currentPostSlice',
    initialState: { currentSelectedPost: {} },
    reducers: {

        setCurrentSelectedPost(state, action) {
          state.currentSelectedPost = {...action.payload.currentSelectedPost}
        },
        getCurrentSelectedPost(state, action) {
            state.currentSelectedPost = { ...action.payload.currentSelectedPost };
        },

        updateCurrentSelectedPost(state, actions) {
            state.currentSelectedPost = { ...actions.payload.updatedCurrentSelectedPost };

        }
    }
});

const { actions, reducer } = currentSelectedPostSlice;
export const { getCurrentSelectedPost, updateCurrentSelectedPost,setCurrentSelectedPost } = actions;
export default currentSelectedPostSlice;
