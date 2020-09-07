import React from "react";
import { connect } from 'react-redux';
import { createPost, deletePost, findPostsForPerson } from "../reducers/postsReducer";
import { createPersonalPost, deletePostById, findAllPostOfPerson } from "../services/postService";
import PostRow from "../components/PostRow.Component";
import HeadingGeneric from "../components/generics/HeadingGeneric.Component";
import { IsLoggedIn } from "../utility/SessionUtility"

class PostList extends React.Component {

	state = {
		newPost: ""
	}

	componentDidMount() {
		if (!IsLoggedIn())
			this.props.history.push("/login?forced")

		this.props.findAllPostsOfPerson(localStorage.getItem("uid"))
	}

	newPostChangeHandler = (event) => {
		this.setState({
			newPost: event.target.value
		})
	}

	newCategoryHandler = (event) => {
		this.setState({
			newCategory: event.target.value
		})
	}

	render() {
		return (
			<div>
				<HeadingGeneric text="You posts" />
				<ul className="list-group">
					{this.props.posts &&
						this.props.posts.map((post, idx) =>
							<PostRow
								key={idx}
								postId={post.id}
								post={post}
								deletePost={this.props.deletePost}
							/>
						)}

					<div className="container list-group-item">
						{
							localStorage.getItem("token") &&
							<div>
								<textarea style={{ "width": "100" }} placeholder="Post title" className="form-control" value={this.state.newPost} onChange={this.newPostChangeHandler} />
								<textarea style={{ "width": "100" }} placeholder="Post category"
								className="form-control" value={this.state.newCategory} onChange={this.newCategoryHandler} />
								<br />
								<button className={"btn btn-primary"} onClick={() => {
									this.props.createNewPost({ "post": this.state.newPost, "category": this.state.newCategory }, localStorage.getItem("uid"));
								}}>Add post</button>
							</div>

						}
					</div>
				</ul>
			</div>


		)
	}
}

const PostListContainer = connect(
	(state) => {
		return { posts: state.postReducer.posts }
	},
	(dispatch) => {
		return {
			createNewPost: (post, personId) => {
				createPersonalPost(post, personId)
					.then((newCreatedPost) => dispatch(createPost({ newPost: newCreatedPost })))
			},
			findAllPostsOfPerson: (personId) => {
				findAllPostOfPerson(personId)
					.then((allPosts) => {
						// console.log(allPosts);
						dispatch(findPostsForPerson({ posts: allPosts }))
					})
			},

			deletePost: (postId) => {
				deletePostById(postId)
					.then((response) => {
						console.log(response);
						dispatch(deletePost({ postToDeleteId: postId }))
					})
			}

		}
	}
)(PostList);

export default PostListContainer;
