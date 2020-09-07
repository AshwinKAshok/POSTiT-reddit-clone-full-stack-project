import React from "react";
import {connect} from "react-redux";
import {
    createComment,
    deleteComment,
    findCommentsForPost,
    updateComment
} from "../reducers/commentReducer";
import {
    createNewComment, deleteCommentById,
    findCommentsByPostId, updateCommentService
} from "../services/commentService";
import CommentRow from "../components/CommentRow.Component";
import HeadingGeneric from "../components/generics/HeadingGeneric.Component";
import { withRouter } from "react-router";

class CommentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newComment: ""
        }
    }

    componentDidMount() {
        if (this.props.postId) {
            this.props.findAllCommentsOfPost(this.props.postId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.postId != prevProps.postId) {
            this.props.findAllCommentsOfPost(this.props.postId);
        }
    }

    newCommentTextChangeHandler = (event) => {
        this.setState({
                          newComment: event.target.value
                      })
    }

    render() {
        return (
            <div>
                <div>
                    <HeadingGeneric text={"Comments"}/>
                    <ul className="list-group">
                        {this.props.comments &&
                         this.props.comments.map((comment, idx) =>
                                                     <CommentRow
                                                         key={idx}
                                                         index={idx}
                                                         commentPersonId={comment.personId}
                                                         commentPostId={comment.postId}
                                                         comment={comment.comment}
                                                         commentId={comment.id}
                                                         deleteComment={this.props.deleteComment}
                                                         updateComment={this.props.updateComment}
                                                     />
                         )}
                    </ul>
                    <div className="container list-group-item">
                        {
                            <div>
                            <textarea style={{"width": "100"}} className={"form-control"}
                                      value={this.state.newComment}
                                      onChange={this.newCommentTextChangeHandler}
                                      placeholder={"New Comment"}
                            />
                                <br/>
                                <button className={"btn btn-primary"} onClick={() => {
                                    if (localStorage.getItem("token")) {
                                        this.props.createNewComment(
                                            {"comment": this.state.newComment},
                                            localStorage.getItem("uid"),
                                            this.props.postId);
                                    } else {
                                        this.props.history.push("/login?forced")
                                    }

                                }}>Comment
                                </button>
                            </div>

                        }
                    </div>
                </div>
            </div>
        );
    }
}

const CommentListContainer = withRouter(connect(
    (state) => {
        return {comments: state.commentReducer.comments}
    },
    (dispatch) => {
        return {
            createNewComment: (comment, personId, postId) => {
                createNewComment(comment, personId, postId)
                    .then((newCreatedComment) => dispatch(
                        createComment({comment: newCreatedComment})))
            },
            findAllCommentsOfPost: (postId) => {
                findCommentsByPostId(postId)
                    .then((allComments) => {
                        // console.log(allPosts);
                        dispatch(findCommentsForPost({comments: allComments}))
                    })
            },

            deleteComment: (commentId) => {
                deleteCommentById(commentId)
                    .then((response) => {
                        console.log(response);
                        dispatch(deleteComment({commentIdToDelete: commentId}))
                    })
            },

            updateComment: (comment, commentId, indexOfCommentInReducer) => {
                updateCommentService(comment, commentId)
                    .then((response) => {
                        console.log(response);
                        dispatch(updateComment({
                                                   updatedComment: response,
                                                   indexOfCommentToUpdate: indexOfCommentInReducer
                                               }))
                    })
            }

        }
    }
)(CommentList))

export default CommentListContainer;
