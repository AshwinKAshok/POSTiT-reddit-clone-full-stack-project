import React from "react";
import { connect } from 'react-redux';
import {
	getCurrentSelectedPost,
	updateCurrentSelectedPost,
	setCurrentSelectedPost
} from "../reducers/currentSelectedPostReducer";
import {
	findPostById,
	updatePost,
	createPersonalPost,
	findAuthorIdByPostId, deletePostById, findPostByIdNonAuth, findAuthorIdByPostIdNonAuth
} from "../services/postService";
import { Link, withRouter } from 'react-router-dom';
import HeadingGenericComponent from "../components/generics/HeadingGeneric.Component";
import { checkPostLiked, createLike, deleteLike } from "../services/LikesService";
import redditService from "../services/redditService";
import { createPerson, findPersonById } from "../services/personService";
import { IsLoggedIn } from "../utility/SessionUtility";
import CommentList from "./CommentList.Container";

class PostPage extends React.Component {
	state = {
		isPostInDB: false,
		post: '',
		likes: '',
		authorId: '#',
		authorName: '',
		updateMode: false,
		postLiked: false
	}

	componentDidMount = async () => {
		let post;

		// let r = redditService.getPostById(this.props.match.params.postId);

		// r.then((response) =>{
		//   console.log(response);
		// })
		if (IsLoggedIn()) {
			findPostById(this.props.match.params.postId)
				.then(async (resp) => {
					post = resp;

					if (post.id) {	
						await this.props.setCurrentSelectedPost(post);
					} else {

						//Inside else means, the post does not exist in local DB
						let localCreatedPost;
						let localCreatedPerson;
						await redditService.getPostById(this.props.match.params.postId)
							.then(async (postDetailsFromRedditService) => {

								//1.Create local user for this reddit post
								await createPerson({
									"username": postDetailsFromRedditService.author,
									"firstname": postDetailsFromRedditService.author_fullname,
									"lastname": "Reddit User",
									"password": "1234"
								})
									.then((response) => {
										console.log(response);
										console.log("local user for reddit post created")
										localCreatedPerson = response;
									})

								//2.Create local post for this reddit post
								await createPersonalPost({
									"post": postDetailsFromRedditService.title,
									"redditId": this.props.match.params.postId
								}, localCreatedPerson.id)
									.then((response) => {
										console.log(response);
										console.log("local post for reddit post created");
										localCreatedPost = response;
									})

								this.props.setCurrentSelectedPost(localCreatedPost);
								console.log(this.props.currentSelectedPost.post);
							})
					}

					const authorId = await findAuthorIdByPostId(this.props.currentSelectedPost.id);
					console.log(authorId);
					let author;
					await findPersonById(authorId)
						.then((response) => {
							author = response;
							console.log(author);
						});

					let postLiked = await checkPostLiked(localStorage.getItem("uid"),
						this.props.currentSelectedPost.id);

					postLiked === 0 ? postLiked = false : postLiked = true;

					console.log("postlikesd");
					console.log(postLiked);
					this.setState({
						authorName: author.username,
						authorId: authorId,
						postLiked: postLiked,
						post: this.props.currentSelectedPost.post,
						likes: this.props.currentSelectedPost.likes,
					})

				})
		} else {
			findPostByIdNonAuth(this.props.match.params.postId)
				.then(async (resp) => {
					post = resp;

					if (post.id) {
						// If not logged in but post in local DB
						await this.props.setCurrentSelectedPost(post);
						const authorId = await findAuthorIdByPostIdNonAuth(
							this.props.currentSelectedPost.id);
						let author;
						await findPersonById(authorId)
							.then((response) => {
								author = response
							})

						this.setState({
							authorId: authorId,
							authorName: author.username,
							post: this.props.currentSelectedPost.post,
							likes: this.props.currentSelectedPost.likes,
						})
					} else {
						// If not logged in and post also not present in local DB, then simple
						// display
						await redditService.getPostById(this.props.match.params.postId)
							.then(async (postDetailsFromRedditService) => {

								this.props.setCurrentSelectedPost(
									{ "post": postDetailsFromRedditService.title });
								console.log(this.props.currentSelectedPost.post);

								this.setState({
									authorName: postDetailsFromRedditService.author,
									post: this.props.currentSelectedPost.post,
									likes: 0
								})
							})
					}

				})
		}
	}

	// createComment = async () => {
	//     let comment = {
	//         //form data
	//     }
	//
	//     let actualComment = await createComment(comment, this.state.post,
	//                                             localStorage.getItem("uid"))
	// }

	postTextChangeHandler = (event) => {
		this.setState({
			post: event.target.value
		})
	}

	toggleUpdatePostMode = () => {
		this.setState((prevState) => ({
			updateMode: !prevState.updateMode
		}))
	}

	render() {
		return (
			<div>
				<HeadingGenericComponent text="Post details" />


				<div className={'container shadow-sm p-3 mb-5 bg-white rounded'}>
					<div className={"row"}>
						{/*<Link to={"/posts"} style={{"marginLeft": "0.5em", "fontSize": "1.5em"}}><i className="fas fa-arrow-left" style={{"color": "Black"}}></i> </Link>*/}
						<button className={"btn"} onClick={this.props.history.goBack}>
							<i className="fas fa-arrow-left" style={{ "color": "Black" }}></i>
						</button>
					</div>
					<div className={"row"} style={{ "marginLeft": "0em" }}>
						{
							!this.state.updateMode &&
							<h1>{this.state.post}</h1>
						}

						{
							this.state.updateMode &&
							<input className="form-control"
								onChange={this.postTextChangeHandler}
								value={this.state.post} />
						}
					</div>

					<div className={"row"}>
						<p className={"ml-3"}>By: <Link
							to={`/profile/${this.state.authorId}`}>{this.state.authorName}</Link>
						</p>
					</div>


					<div className={"row"}>
						{
							IsLoggedIn() &&
							(localStorage.getItem("uid") === this.state.authorId) &&
							!this.state.updateMode &&
							<button className={"btn"} onClick={this.toggleUpdatePostMode}>
								<i className="fas fa-pencil-alt"></i>
							</button>
						}
						{
							this.state.updateMode &&
							<button className={"btn"} onClick={async () => {
								let updatedPost = { ...this.props.currentSelectedPost };
								updatedPost.post = this.state.post;

								await this.props.updateCurrentSelectedPost(updatedPost,
									this.props.currentSelectedPost.id);
								this.toggleUpdatePostMode();
							}}><i className="fas fa-check"></i></button>
						}

						{
							IsLoggedIn() &&
							!this.state.postLiked &&
							<button className={"btn"} onClick={() => {
								let updatedPost = { ...this.props.currentSelectedPost };
								updatedPost.likes = updatedPost.likes + 1;
								createLike(localStorage.getItem("uid"),
									this.props.currentSelectedPost.id)
									.then((resp) => {
										console.log(resp);
									})
								this.setState((prevState) => ({
									postLiked: true,
									likes: prevState.likes + 1
								}))
								this.props.updateCurrentSelectedPost(updatedPost,
									this.props.currentSelectedPost.id);
								console.log("likes done:");
								console.log(this.props.currentSelectedPost.post);
							}}><i className="fas fa-heart"
								style={{ "color": "grey" }}></i> {this.state.likes}</button>
						}

						{
							IsLoggedIn() &&
							this.state.postLiked &&
							<button className={"btn"} onClick={() => {
								if (this.state.likes > 0) {
									let updatedPost = { ...this.props.currentSelectedPost };
									updatedPost.likes = updatedPost.likes - 1;
									console.log(updatedPost);
									deleteLike(localStorage.getItem("uid"),
										this.props.currentSelectedPost.id)
										.then((resp) => {
											console.log(resp);
										})
									this.setState((prevState) => ({
										postLiked: false,
										likes: prevState.likes - 1
									}))
									this.props.updateCurrentSelectedPost(updatedPost,
										this.props.currentSelectedPost.id);

								}
							}}><i className="fas fa-heart"
								style={{ "color": "red" }}></i> {this.state.likes}</button>
						}
						{
							IsLoggedIn() &&
							(localStorage.getItem("uid") === this.state.authorId) &&
							<button className={"btn"} onClick={() => {
								deletePostById(this.props.currentSelectedPost.id)
									.then((response) => {
										console.log(response);
										this.props.history.goBack();
									})
							}}><i className="fas fa-times"></i></button>
						}

					</div>
				</div>

				<CommentList postId={this.props.currentSelectedPost.id} />
			</div>
		)
	}

}

export default withRouter(connect(
	(state) => {
		return { currentSelectedPost: state.currentSelectedPostReducer.currentSelectedPost }
	},
	(dispatch) => {
		return {
			findCurrentSelectedPost: async (postId) => {
				await findPostById(postId)
					.then((response) => {
						dispatch(getCurrentSelectedPost({ currentSelectedPost: response }))
					})
			},
			setCurrentSelectedPost: (post) => {
				dispatch(setCurrentSelectedPost({ currentSelectedPost: post }))
			}
			,
			updateCurrentSelectedPost: async (updatedPost, postId) => {
				await updatePost(updatedPost, postId)
					.then((response) => {
						dispatch(updateCurrentSelectedPost({ updatedCurrentSelectedPost: response }))
					})
			}
		}
	}
)(PostPage))
