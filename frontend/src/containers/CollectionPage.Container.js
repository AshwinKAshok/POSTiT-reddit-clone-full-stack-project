import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { IsLoggedIn, IsAuthorized } from '../utility/SessionUtility'
import HeadingGeneric from "../components/generics/HeadingGeneric.Component"
import { findCollectionById, addPostToCollection, addUserToCollection, removePostFromCollection, removeUserFromCollection, updateCollection, deleteCollection } from "../services/collectionService"
import { findPostById, getPostsByCollectionId } from "../services/postService"
import { findPersonByUsername, findPersonById } from "../services/personService"
import ListItemGenericComponent from '../components/generics/ListItemGeneric.Component';
import { performGetCollection } from '../reducers/collectionReducer'

class CollectionPage extends React.Component {
	state = {
		form: {
			collection_name: "",
			collection_description: ""
		},

		posts: [],
		persons: [],
		userOwned: false,
		personIdToAdd: "",
		postIdToAdd: "",
		editing: false
	}

	componentDidMount = async () => {
		await this.props.dispatchGetCollectionById(this.props.match.params.collectionId)

		if (!this.props.collection.collection_name)
			return

		this.setState({
			form: {
				collection_name: this.props.collection.collection_name,
				collection_description: this.props.collection.collection_description
			}
		})

		//get users in collection
		if (this.props.collection.collectionMemberships) {
			this.props.collection.collectionMemberships.forEach((mem) => {
				findPersonById(mem.personId)
					.then(p => this.setState({
						persons: [...this.state.persons, p]
					}))
			})
		}

		//get posts in collection
		this.setState({ posts: await getPostsByCollectionId(this.props.collection.id) })

		//check if current user owns this collection
		if (this.props.collection.collectionMemberships) {
			this.props.collection.collectionMemberships.forEach((mem) => {
				if (mem.personId === parseInt(localStorage.getItem("uid")))
					this.setState({ userOwned: true })
			})
		}
	}

	postNameHandler = (e) => {
		this.setState({ postIdToAdd: e.target.value })
	}

	submitNewPost = async () => {
		const newPost = await findPostById(this.state.postIdToAdd)

		if (newPost) {
			let r = await addPostToCollection(this.state.postIdToAdd, this.props.collection.id)
		}
		window.location.reload()
	}

	usernameHandler = (e) => {
		this.setState({ personIdToAdd: e.target.value })
	}

	submitNewUser = async () => {
		const newUser = await findPersonById(this.state.personIdToAdd)

		if (newUser) {
			let r = await addUserToCollection(newUser.id, this.props.collection.id)
		}
		window.location.reload()
	}

	collectionTitleHandler = (e) => {
		let form = this.state.form;
		form.collection_name = e.target.value
		this.setState({ form: form })
	}

	collectionDescriptionHandler = (e) => {
		let form = this.state.form;
		form.collection_description = e.target.value
		this.setState({ form: form })
	}

	toggleEditing = () => {
		this.setState({ editing: !this.state.editing })
	}

	updateCollection = async () => {
		this.toggleEditing()

		await updateCollection({
			id: this.props.collection.id,
			collection_name: this.state.form.collection_name,
			collection_description: this.state.form.collection_description
		})

		window.location.reload()
	}

	deleteCollection = () => {
		deleteCollection(this.props.collection.id)
		this.props.history.push('/collections')
		window.location.reload()
	}

	removePost = (pid) => {
		removePostFromCollection(pid, this.props.collection.id)
		window.location.reload()
	}

	removeUser = (uid) => {
		removeUserFromCollection(uid, this.props.collection.id)
		window.location.reload()
	}

	render() {
		return (
			<div>
				{!this.state.editing &&
					<div>
						{this.state.userOwned &&
							<HeadingGeneric
								text={"Administrator for " + this.props.collection.collection_name}
							/>
						}

						{!this.state.userOwned &&
							<HeadingGeneric
								text={"Title: " + this.props.collection.collection_name}
							/>
						}

						<div className="container-fluid text-center">
							<div className="h4">
								Description: {this.props.collection.collection_description}
							</div>
							{this.state.userOwned &&
								<div>
									<div
										onClick={this.toggleEditing}
										className="col-1 btn btn-outline-secondary">
										Edit
								</div>
									<div
										onClick={this.deleteCollection}
										className="col-1 btn btn-outline-danger">
										Delete
									</div>
								</div>
							}
						</div>
					</div>
				}

				{this.state.editing &&
					<div>
						<HeadingGeneric
							text="Editing Collection"
						/>
						<div className="row">
							<div className="col-4"></div>
							<form className="col-4 container text-center">
								<input type="text" className="form-control"
									onChange={this.collectionTitleHandler}
									value={this.state.form.collection_name}
								/>
								<input type="text" className="form-control"
									onChange={this.collectionDescriptionHandler}
									value={this.state.form.collection_description}
								/>
								<div className="btn btn-primary mr-2"
									onClick={this.updateCollection}>
									Accept
							</div>

								<div className="btn btn-primary mr-2"
									onClick={this.toggleEditing}>
									Cancel
							</div>
							</form>
							<div className="col-4"></div>
						</div>
					</div>
				}
				<br />

				<div className="container-fluid row">
					<div className="col-7">
						<div className="container-fluid list-group-item-secondary p-2">
							<div className="h4 text-center">
								Posts in collection
							</div>
						</div>
						<ul className="list-group">
							{this.state.posts && Array.isArray(this.state.posts) && this.state.posts.map((post, idx) =>
								<div
									key={idx}
									className="list-group-item"
								>
									<div className="row">
										<Link className="col"
											to={"/profile/" + post.id}>
											<div>
												{post.post}
											</div>
										</Link>

										{this.state.userOwned &&
											<div
												onClick={() => this.removePost(post.id)}
												className="col-2 btn btn-inline btn-outline-danger">
												X
											</div>
										}
									</div>
								</div>
							)}

							{IsLoggedIn() && this.state.userOwned &&
								<div className="list-group-item">
									<form className="form-group text-center">
										<input type="text"
											value={this.state.postIdToAdd}
											onChange={this.postNameHandler}
											placeholder="Post Id"
											className="form-control-plaintext" />
										<div className="btn btn-primary" onClick={this.submitNewPost}>Add</div>
									</form>
								</div>
							}
						</ul>
					</div>
					<div className="col-5">
						<div className="container-fluid list-group-item-secondary p-2">
							<ul className="list-group">
								<div className="list-group-item-secondary">
									<div key="123" className="h4 text-center">
										Users in Collection
										</div>
								</div>
								{this.state.persons && this.state.persons.map((person, idx) =>
									<div
										key={idx}
										className="list-group-item"
									>
										<div className="row">
											<Link className="col"
												to={"/profile/" + person.id}>
												<div>
													{person.firstname}
												</div>
											</Link>
											{this.state.userOwned &&
												<div
													onClick={() => this.removeUser(person.id)}
													className="col-2 btn btn-inline btn-outline-danger">
													X
											</div>
											}
										</div>
									</div>
								)}

								{IsLoggedIn() && this.state.userOwned &&
									<div className="list-group-item">
										<form className="form-group text-center">
											<input type="text"
												value={this.state.personIdToAdd}
												onChange={this.usernameHandler}
												placeholder="Person Id"
												className="form-control-plaintext" />
											<div className="btn btn-primary" onClick={this.submitNewUser}>Add</div>
										</form>
									</div>
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(
	(state) => state.collectionReducer,
	(dispatch) => {
		return {
			dispatchGetCollectionById: async (cid) => {
				dispatch(performGetCollection({
					collection: await findCollectionById(cid)
				}))
			}
		}
	}
)(CollectionPage));
