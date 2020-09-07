import React from "react";
import { findPersonById, updatePerson } from "../services/personService";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import HeadingGeneric from "../components/generics/HeadingGeneric.Component"
import { IsLoggedIn, IsAuthorized } from "../utility/SessionUtility"
import CollectionRowComponent from "../components/CollectionRow.Component.js";
import { performUpdatePerson, performFindPerson } from "../reducers/personReducer"

class ProfilePage extends React.Component {
	state = {
		// person: {},
		form: {
			firstname: "",
			lastname: "",
			username: "",
			password: "",
			dob: "",
			address: "",
			phone: ""
		}
	}

	componentDidMount = async () => {
		const personId = this.props.match.params.personId ?
			this.props.match.params.personId : IsLoggedIn() ?
				localStorage.getItem("uid") : ""

		await this.props.dispatchFindPerson(personId)

		if (this.props.person.error)
			this.setState({ notFound: true })
		else
			this.setState({ form: this.props.person })
	}

	firstnameChangeHandler = (event) => {
		let person = { ...this.state.form }
		person.firstname = event.target.value

		this.setState({
			form: person
		})
	}

	lastnameChangeHandler = (event) => {
		let person = { ...this.state.form }
		person.lastname = event.target.value

		this.setState({
			form: person
		})
	}

	usernameChangeHandler = (event) => {
		let person = { ...this.state.form }
		person.username = event.target.value

		this.setState({
			form: person
		})
	}

	passwordChangeHandler = (event) => {
		let person = { ...this.state.form }
		person.password = event.target.value

		this.setState({
			form: person
		})
	}

	dobChangeHandler = (event) => {
		let person = { ...this.state.form }
		person.dob = event.target.value

		this.setState({
			form: person
		})
	}

	addressChangeHandler = (event) => {
		let person = { ...this.state.form }
		person.address = event.target.value

		this.setState({
			form: person
		})
	}

	phoneChangeHandler = (event) => {
		let person = { ...this.state.form }
		person.phone = event.target.value

		this.setState({
			form: person
		})
	}

	submitPersonInfo = () => {
		this.props.dispatchUpdatePerson(this.state.form);
	}

	render() {
		return (
			<div>
				{this.state.notFound &&
					<div className="alert alert-danger" role="alert">
						User not found!
							</div>
				}
				{this.props.person.id &&
					<div>

						<HeadingGeneric
							text={`${this.props.person.firstname} ${this.props.person.lastname}'s profile`}
						/>

						{!IsAuthorized(this.props.person.id) &&
							<div className="container-fluid row p-3">
								<div className="col">
									<div className="container-fluid">
										<ul className="list-group">
											<div className="list-group-item-secondary">
												<div key="123" className="h4 text-center">
													User details
												</div>
											</div>
											<div className="list-group-item text-center">
												<b>First name:</b> {this.props.person.firstname}
											</div>
											<div className="list-group-item text-center">
												<b>Last name:</b> {this.props.person.lastname}
											</div>
											<div className="list-group-item text-center">
												<b>Username:</b> {this.props.person.username}
											</div>
										</ul>
									</div>
								</div>
							</div>
						}

						<div className="container-fluid row p-3">
							<div className="col">
								<div className="container-fluid">
									<ul className="list-group">
										<div className="list-group-item-secondary">
											<div key="123" className="h4 text-center">
												Owns {`${this.props.person.collectionMemberships.length}`} collections
											</div>
										</div>
										{this.props.person.collectionMemberships && this.props.person.collectionMemberships.map((col, idx) =>
											<Link
												key={idx}
												to={"/collections/" + col.collectionId}>
												<li
													className="list-group-item ">
													Col#{col.collectionId}
												</li>
											</Link>
										)}
									</ul>
								</div>

								<div className="container-fluid">
									<ul className="list-group">
										<div className="list-group-item-secondary">
											<div className="h4 text-center">
												Owns {`${this.props.person.posts.length}`} posts
											</div>
										</div>
										{this.props.person.posts && this.props.person.posts.map((post, idx) =>
											<Link
												key={idx}
												to={"/details/" + post.id}>
												<li
													className="list-group-item">
													Post#{post.id}
												</li>
											</Link>
										)}
									</ul>
								</div>

								<div className="container-fluid">
									<ul className="list-group">
										<div className="list-group-item-secondary">
											<div className="h4 text-center">
												Owns {`${this.props.person.comments.length}`} comments
											</div>
										</div>
										{this.props.person.comments && this.props.person.comments.map((comment, idx) =>
											<Link
												key={idx}
												to={"/details/" + comment.postId}>
												<li
													className="list-group-item">
													Comment#{comment.id}
												</li>
											</Link>
										)}
									</ul>
								</div>
							</div>

							{IsAuthorized(this.props.person.id) &&
								<div className="col">
									<form className="container">
										<div className="form-group">
											<label htmlFor="inputfirstname">First Name</label>
											<input type="text" className="form-control" id="inputfirstname"
												onChange={this.firstnameChangeHandler} value={this.state.form.firstname}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="inputlastname">Last Name</label>
											<input type="text" className="form-control" id="inputlastname"
												onChange={this.lastnameChangeHandler} value={this.state.form.lastname}
											/>
										</div>
										<div className="form-group">
											Username (immutable): {this.state.form.username}
											{/* <label htmlFor="inputUserName">User Name</label>
											<input type="text" className="form-control" id="inputUserName"
												onChange={this.usernameChangeHandler} value={this.state.form.username}
											/> */}
										</div>
										<div className="form-group">
											<label htmlFor="inputPassword">Password</label>
											<input type="password" className="form-control" id="inputPassword"
												onChange={this.passwordChangeHandler} value={this.state.form.password}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="inputDOB">Date of Birth</label>
											<input type="date" className="form-control" id="inputDOB"
												onChange={this.dobChangeHandler} value={this.state.form.dob}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="inputAddress">Address</label>
											<input type="text" className="form-control" id="inputAddress"
												onChange={this.addressChangeHandler} value={this.state.form.address} />
										</div>
										<div className="form-group">
											<label htmlFor="inputPhone">Phone</label>
											<input type="phone" className="form-control" id="inputPhone"
												onChange={this.phoneChangeHandler} value={this.state.form.phone} />
										</div>
										<div className="form-group">
											<div className="btn btn-primary mr-2"
												onClick={this.submitPersonInfo}>
												Update
											</div>
										</div>
									</form>
								</div>
							}
						</div>


					</div>
				}
			</div>
		)
	}
}

export default withRouter(connect(
	(state) => state.personReducer,
	(dispatch) => {
		return {
			dispatchFindPerson: async (pid) => {
				dispatch(performFindPerson({
					person: await findPersonById(pid)
				}))

			},
			dispatchUpdatePerson: async (person) => {
				await updatePerson(person)
				dispatch(performUpdatePerson({
					updatedPerson: await findPersonById(person.id)
				}))
			}
		}
	}
)(ProfilePage));;


