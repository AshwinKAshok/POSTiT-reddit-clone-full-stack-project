import {createSlice} from '@reduxjs/toolkit';

const commentSlice = createSlice({
                                     name: 'commentReducer',
                                     initialState: {comments: []},
                                     reducers: {

                                         findCommentsForPost(state, action) {
                                             state.comments = [];
                                             state.comments.push(...action.payload.comments);
                                         },
                                         createComment(state, action) {
                                             state.comments.push(action.payload.comment);
                                         },

                                         deleteComment(state, action) {
                                             state.comments =
                                                 state.comments.filter(comment => comment.id
                                                                                  != action.payload.commentIdToDelete)
                                         }
                                         ,
                                         updateComment(state, action) {
                                             state.comments[action.payload.indexOfCommentToUpdate] =
                                                 action.payload.updatedComment;
                                         }
                                     }
                                 });

const {actions, reducer} = commentSlice;
export const {findCommentsForPost, deleteComment, createComment, updateComment} = actions;
export default commentSlice;
